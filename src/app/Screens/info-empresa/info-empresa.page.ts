import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/Services/empresas.services';
import { ActivatedRoute } from '@angular/router';
import { IEmpresaKey, IValoracion} from 'src/app/interfaces';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { ValoracionesService } from 'src/app/Services/valoraciones.service';


@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.page.html',
  styleUrls: ['./info-empresa.page.scss'],
})
export class InfoEmpresaPage implements OnInit {

  key: string;

  constructor(private _service: EmpresasService, private _activatedRoute: ActivatedRoute,
    private route: Router, private location: Location, private _valService: ValoracionesService) { }

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
  comentario : string = "";
  rating : number;

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
      this.empresas[0].Valoracion = this.rating;
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

}
