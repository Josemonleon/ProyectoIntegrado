import { Component, OnInit } from '@angular/core';
import {IEmpresa} from 'src/app/interfaces';
import {EmpresasService} from '../../Services/empresas.services';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
})
export class EmpresasPage implements OnInit {

  constructor(private _service: EmpresasService) { }

  ngOnInit() {
    let ref = this._service.getListaEmpresas();
    ref.once("value", snapshot =>{
      snapshot.forEach(child => {
        let value = child.val();
        this.empresas.push(value);
      })
    })
  }

  empresas: IEmpresa[] = [];

}
