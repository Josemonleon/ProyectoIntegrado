import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/Services/empresas.services';
import { ActivatedRoute } from '@angular/router';
import { IEmpresaKey} from 'src/app/interfaces';
import {Router} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.page.html',
  styleUrls: ['./info-empresa.page.scss'],
})
export class InfoEmpresaPage implements OnInit {

  key: string;

  constructor(private _service: EmpresasService, private _activatedRoute: ActivatedRoute,
    private route: Router, private location: Location) { }

  ngOnInit() {
    this.key = this._activatedRoute.snapshot.paramMap.get("key");
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
    this.route.navigate(['../edit-empresa/' + this.key]);
  }

  goBack(){
    this.location.back();
  }

  empresas: IEmpresaKey[] = [];

}
