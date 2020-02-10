import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, } from '@angular/router';
import { AlumnosService } from 'src/app/Services/alumnos.service';
import { IAlumnoKey } from 'src/app/interfaces';

@Component({
  selector: 'app-alumnos-asignados',
  templateUrl: './alumnos-asignados.page.html',
  styleUrls: ['./alumnos-asignados.page.scss'],
})
export class AlumnosAsignadosPage implements OnInit {

  constructor(private location: Location, private _activatedRoute: ActivatedRoute, private _service: AlumnosService) { }

  ngOnInit() {
    this.empresa = this._activatedRoute.snapshot.paramMap.get("empresaKey");

    this.alumnos = [];

    let ref = this._service.getAlumnos().orderByChild("Empresa").equalTo(this.empresa);
    ref.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        value.key=child.key;
        this.alumnos.push(value);
      })
    })
  }

  empresa: string;
  alumnos: IAlumnoKey[] = [];

  goBack(){
    this.location.back();
  }

}
