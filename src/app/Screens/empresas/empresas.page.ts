import { Component, OnInit } from '@angular/core';
import {IEmpresa, IEmpresaKey} from 'src/app/interfaces';
import {EmpresasService} from '../../Services/empresas.services';
import {Router} from '@angular/router';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
})


export class EmpresasPage implements OnInit {


  constructor(private _service: EmpresasService, private route: Router, private navController: NavController) { }


  ngOnInit() {
    this.descargarDatos();
  }

  empresas: IEmpresaKey[] = [];
  rating : number;
  nombreEmpresa: string;
  mayorMenor: boolean = true;

  async descargarDatos(){
    this.empresas = [];
    this.rating = 6;

    let ref = this._service.getListaEmpresas().orderByChild("Valoracion");
    await ref.once("value", snapshot =>{
      snapshot.forEach(child => {
        let value = child.val();
        value.key = child.key;
        this.empresas.push(value);
      })
    })

    this.nombreEmpresa = "";

    this.cambiarOrden();

  }

  navAddEmpresa(){
    this.navController.navigateRoot(['/add-empresa']); 
  }

  navInfoEmpresa(key){
    this.navController.navigateRoot(['/info-empresa/', key]); 
  }

  filtroValoracion(){
    if(this.rating > 0 && this.rating <6){
      this.nombreEmpresa = "";
      this.empresas = [];
  
      let ref = this._service.getListaEmpresas().orderByChild("Valoracion").startAt(+this.rating).endAt(+this.rating+0.999999);
  
      ref.once("value", snapshot => {
        snapshot.forEach(child => {
          let value = child.val();
          value.key = child.key;
          this.empresas.push(value);
        })
      })
    }
  }

  filtroNombre(){
    if(this.rating > 0 && this.rating < 6) {this.rating = 6;}

    this.empresas = [];

    let ref = this._service.getListaEmpresas();
    ref.once("value", snapshot =>{
      snapshot.forEach(child => {
        let value = child.val();
        value.key = child.key;
        
        if(value.Nombre.toLowerCase().includes(this.nombreEmpresa.toLowerCase())){
          this.empresas.push(value);
        }
      })
    })
  }

  cambiarOrden(){
    var aux_array;
    var long = this.empresas.length;

    if(this.mayorMenor){
      for (let i = 0; i < (long); i++) {
        for (let j = 0; j < (long); j++) { 
          if (+this.empresas[i].Valoracion > +this.empresas[j].Valoracion) { 
  
            aux_array = this.empresas[i];
            this.empresas[i] = this.empresas[j];
            this.empresas[j] = aux_array;
          }
        }
      }
      this.mayorMenor = false
    } else {
      for (let i = 0; i < (long); i++) {
        for (let j = 0; j < (long); j++) { 
          if (+this.empresas[i].Valoracion < +this.empresas[j].Valoracion) { 
  
            aux_array = this.empresas[i];
            this.empresas[i] = this.empresas[j];
            this.empresas[j] = aux_array;
          }
        }
      }
      this.mayorMenor = true
    }
  }
}
