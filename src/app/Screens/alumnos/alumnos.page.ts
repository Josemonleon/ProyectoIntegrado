import { Component, OnInit } from '@angular/core';
import { IAlumno, IAlumnoKey } from 'src/app/interfaces';
import { AlumnosService } from '../../Services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  constructor(private _service: AlumnosService) { }

  ngOnInit() {

    let ref = this._service.getAlumnos();
    ref.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        value.key=child.key;
        this.alumnos.push(value);
      })
    })
  }

  alumnos: IAlumnoKey[] = [];

}
