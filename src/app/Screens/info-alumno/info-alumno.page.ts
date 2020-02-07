import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAlumno } from 'src/app/interfaces';
import { AlumnosService } from 'src/app/Services/alumnos.service';
import { EmpresasService } from 'src/app/Services/empresas.services';

@Component({
  selector: 'app-info-alumno',
  templateUrl: './info-alumno.page.html',
  styleUrls: ['./info-alumno.page.scss'],
})
export class InfoAlumnoPage implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _service: AlumnosService, private _empService:EmpresasService) { }

  async ngOnInit() {
    //this.key = this._activatedRoute.snapshot.paramMap.get('key');
  }

  async ionViewWillEnter(){
    this.key = this._activatedRoute.snapshot.paramMap.get('key');

    await this.descargarDatos();
  }

  async descargarDatos(){
    
    let ref = this._service.getAlumnos().orderByKey().equalTo(this.key);
    await ref.once("value", snapshot => {
      snapshot.forEach(child => {
        this.item = child.val();
      })
    })

    if(this.item.Empresa !== "Ninguna"){
      let ref2 = this._empService.getListaEmpresas().orderByKey().equalTo(this.item.Empresa);
      await ref2.once("value", snapshot => {
        snapshot.forEach(child => {
          this.empresa = child.val();
        })
      })
    } else {
      this.empresa = {"Nombre": "Ninguna"}
    }
  }

  key: string;
  item: IAlumno = {
    "Apellidos": "",
    "Curso": "",
    "Email": "",
    "Localidad": "",
    "Nombre": "",
    "Tutor": "",
    "Empresa": ""
  };

  empresa: Object = {}
}
