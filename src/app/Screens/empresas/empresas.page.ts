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

  descargarDatos(){
    this.empresas = [];
    this.rating = 6;

    let ref = this._service.getListaEmpresas();
    ref.once("value", snapshot =>{
      snapshot.forEach(child => {
        let value = child.val();
        value.key = child.key;
        this.empresas.push(value);
      })
    })

  }

  navAddEmpresa(){
    this.navController.navigateRoot(['/add-empresa']); 
  }

  navInfoEmpresa(key){
    this.navController.navigateRoot(['/info-empresa/', key]); 
  }

  filtroValoracion(){

    this.empresas = [];

    let ref = this._service.getListaEmpresas().orderByChild("Valoracion").startAt(+this.rating).endAt(+this.rating+0.999999);

      ref.once("value", snapshot => {
        snapshot.forEach(child => {
          let value = child.val();
          value.key = child.key;
          this.empresas.push(value);
        })
      })

    console.log("hola");
  }
}
