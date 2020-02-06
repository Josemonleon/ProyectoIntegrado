import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IValoracion } from 'src/app/interfaces';
import { ValoracionesService } from '../../Services/valoraciones.service'
import { EmpresasService } from 'src/app/Services/empresas.services';

@Component({
  selector: 'app-ver-valoraciones',
  templateUrl: './ver-valoraciones.page.html',
  styleUrls: ['./ver-valoraciones.page.scss'],
})
export class VerValoracionesPage implements OnInit {

  constructor(private location: Location, private _activatedRoute: ActivatedRoute, private _service: ValoracionesService,
    private _empService: EmpresasService) { }

  ngOnInit() {
    this.empresaKey = this._activatedRoute.snapshot.paramMap.get("empresa");

    let ref = this._service.getValoraciones().orderByChild("Empresa").equalTo(this.empresaKey);

    ref.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        this.valoraciones.push(value);
      })
    })

    let ref2 = this._empService.getListaEmpresas();

    ref2.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        this.nombreEmpresa = value.Nombre;
      })
    })
  }

  goBack(){
    this.location.back();
  }

  empresaKey: string;
  valoraciones: IValoracion[] = [];
  nombreEmpresa: string;
}
