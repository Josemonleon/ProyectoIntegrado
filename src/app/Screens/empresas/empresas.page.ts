import { Component, OnInit } from '@angular/core';
import {IEmpresa, IEmpresaKey} from 'src/app/interfaces';
import {EmpresasService} from '../../Services/empresas.services';
import {Router} from '@angular/router';



@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
})


export class EmpresasPage implements OnInit {


  constructor(private _service: EmpresasService, private route: Router) { }




  ngOnInit() {
    let ref = this._service.getListaEmpresas();
    ref.once("value", snapshot =>{
      snapshot.forEach(child => {
        let value = child.val();
        value.key = child.key;
        this.empresas.push(value);
      })
    })
  }

  empresas: IEmpresaKey[] = [];

  //Método para pasar la ruta
  verInfo(key){
    this.route.navigate(['../info-empresa/' + key]);
  }
  



}
