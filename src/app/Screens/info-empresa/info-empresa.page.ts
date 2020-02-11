import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/Services/empresas.services';
import { ActivatedRoute, } from '@angular/router';
import { IEmpresaKey, IValoracion, IAlumnoKey} from 'src/app/interfaces';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { ValoracionesService } from 'src/app/Services/valoraciones.service';
import { NavController } from '@ionic/angular';
import { AlumnosService } from 'src/app/Services/alumnos.service';


@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.page.html',
  styleUrls: ['./info-empresa.page.scss'],
})
export class InfoEmpresaPage implements OnInit {

  key: string;
  editar : boolean = false;
  empresas: IEmpresaKey[] = [];
  comentario : string = "";
  rating : number;

  constructor(private _service: EmpresasService, private _activatedRoute: ActivatedRoute,
    private router: Router, private location: Location, private _valService: ValoracionesService,
    private navController: NavController, private _alService: AlumnosService) { }

  ngOnInit() {
    //this.key = this._activatedRoute.snapshot.paramMap.get("key");
    //this.editar = JSON.parse(this._activatedRoute.snapshot.paramMap.get("bool"));
  }

  ionViewWillEnter(){
    this.key = this._activatedRoute.snapshot.paramMap.get("key");
    this.editar = JSON.parse(this._activatedRoute.snapshot.paramMap.get("bool"));

    this.descargarDatos();
  }

  descargarDatos(){
    let ref = this._service.getListaEmpresas();
    ref.orderByKey().equalTo(this.key).once("value", snapshot => {
      snapshot.forEach(child => {
        this.empresas.push(child.val());
        this.empresas[this.empresas.length - 1].key = child.key;
      });
    }
    );
  }

  editarEmpresa(){
    this.router.navigate(['../edit-empresa/' + this.key]);
  }

  goBack(){
    if(this.editar){
      const url = `/home/empresas`;
      this.router.navigateByUrl(url);
    } else {
      this.location.back();
    }
  }

  verValoraciones(key){
    this.navController.navigateRoot(['/ver-valoraciones/', key]); 
  }

  alumnosAsignados(){
    this.navController.navigateRoot(['/alumnos-asignados/', this.key]); 
  }

  addValoracion(){
    //Añado la valoracion a la lista de valoraciones
    let valoracion: IValoracion = 
    {
      "Comentario": this.comentario,
      "Empresa": this.key,
      "Valoracion": this.rating
    }

    this._valService.setValoracion(valoracion);

    //Calculo la nueva valoracion de la empresa
    if(this.empresas[0].Valoracion == 0){
      this.empresas[0].Valoracion = +this.rating;
    }
    else 
    {
      let actual : number = this.empresas[0].Valoracion;
      this.empresas[0].Valoracion = (+actual + +this.rating)/2;
    }
    let ref2 = this._service.getListaEmpresas();
    ref2.child(this.key).set(this.empresas[0]);
    
    //Recargo la pantalla
    console.log("Valoracion añadida correctamente")
  }

  eliminarEmpresa(){
    let ref = this._service.getListaEmpresas();

    ref.orderByKey().equalTo(this.key).once("value", snapshot => {
      snapshot.forEach(child => {
        let clave = child.key;
        ref.child(clave).remove();
      })
    })

    console.log("Empresa eliminada correctamente")

    this.router.navigate(['/home/empresas']);
  }

  async desasignarEmpresa(){

    //Descargo todos los alumnos que tienen la empresa asignada
    let alumnos: IAlumnoKey[] = [];
    let ref = this._alService.getAlumnos().orderByChild("Empresa").equalTo(this.key);

    await ref.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        value.key=child.key;
        console.log("Alumno: " + value.Nombre)
        alumnos.push(value);
      })
    })

    //Cambio la empresa asignada a ninguna
    let ref2 = this._alService.getAlumnos();

    for (let i = 0; i < alumnos.length; i++) {
      alumnos[i].Empresa = "Ninguna";
      ref2.child(alumnos[i].key).set(alumnos[i]);
    }

    //Llamo al metodo para eliminar la empresa
    this.eliminarEmpresa();
  }

}
