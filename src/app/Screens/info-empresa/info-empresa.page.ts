import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/Services/empresas.services';
import { ActivatedRoute, } from '@angular/router';
import { IEmpresaKey, IValoracion, IAlumnoKey} from 'src/app/interfaces';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { ValoracionesService } from 'src/app/Services/valoraciones.service';
import { NavController, AlertController } from '@ionic/angular';
import { AlumnosService } from 'src/app/Services/alumnos.service';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';


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
  email: string;

  constructor(private _service: EmpresasService, private _activatedRoute: ActivatedRoute,
    private router: Router, private location: Location, private _valService: ValoracionesService,
    private navController: NavController, private _alService: AlumnosService, private alertController: AlertController,
    private _translate: TranslateService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    //this.key = this._activatedRoute.snapshot.paramMap.get("key");
    //this.editar = JSON.parse(this._activatedRoute.snapshot.paramMap.get("bool"));
  }

  ionViewWillEnter(){
    this.key = this._activatedRoute.snapshot.paramMap.get("key");
    this.editar = JSON.parse(this._activatedRoute.snapshot.paramMap.get("bool"));
    this.email = this.afAuth.auth.currentUser.email;
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

  addValoracion() {

    if (this.rating >= 1 && this.rating <= 5) {

      //Añado la valoracion a la lista de valoraciones
      let valoracion: IValoracion =
      {
        "Comentario": this.comentario,
        "Empresa": this.key,
        "Valoracion": this.rating
      }

      this._valService.setValoracion(valoracion);

      //Calculo la nueva valoracion de la empresa
      if (this.empresas[0].Valoracion == 0) {
        this.empresas[0].Valoracion = +this.rating;
      }
      else {
        let actual: number = this.empresas[0].Valoracion;
        this.empresas[0].Valoracion = (+actual + +this.rating) / 2;
      }

      //Asigno la nueva valoracion
      let ref2 = this._service.getListaEmpresas();
      ref2.child(this.key).set(this.empresas[0]);

      this.valoracionAñadida();

    } else {
      this.errorRating();
    }

  }

  async errorRating() {

    let mensaje;
    this._translate.get('PAGES.Info-Empresa.ALERT_ERROR').subscribe( value => { mensaje = value; } )

    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async valoracionAñadida() {

    let mensaje;
    this._translate.get('PAGES.Info-Empresa.VALORACION_AÑADIDA').subscribe( value => { mensaje = value; } )

    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
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

    //Elimino las valoraciones de la empresa
    let ref3 = this._valService.getValoraciones();

    ref3.orderByChild("Empresa").equalTo(this.key).once("value", snapshot => {
      snapshot.forEach(child => {
        let clave = child.key;
        ref3.child(clave).remove();
      })
    })

    //Llamo al metodo para eliminar la empresa
    this.eliminarEmpresa();
  }

  async confirmacion() {

    let alertEliminar;
    this._translate.get('PAGES.Info-Empresa.ALERT_ELIMINAR').subscribe( value => { alertEliminar = value; } )

    let cancelar;
    this._translate.get('PAGES.Info-Empresa.CANCELAR').subscribe( value => { cancelar = value; } )

    let eliminar;
    this._translate.get('PAGES.Info-Empresa.ELIMINAR').subscribe( value => { eliminar = value; } )

    let confirmacion;
    this._translate.get('PAGES.Info-Empresa.CONFIRMACION').subscribe( value => { confirmacion = value; } )

    const alert = await this.alertController.create({
      header: confirmacion,
      message: alertEliminar,
      buttons: [
        {
          text: cancelar,
          role: 'cancel',
        }, {
          text: eliminar,
          handler: () => {
            console.log('Confirm Okay');
            this.desasignarEmpresa();
          }
        }
      ]
    });

    await alert.present();
  }

}
