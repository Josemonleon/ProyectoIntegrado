import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAlumno } from 'src/app/interfaces';
import { AlumnosService } from 'src/app/Services/alumnos.service';

@Component({
  selector: 'app-info-alumno',
  templateUrl: './info-alumno.page.html',
  styleUrls: ['./info-alumno.page.scss'],
})
export class InfoAlumnoPage implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _service: AlumnosService) { }

  async ngOnInit() {
    this.key = this._activatedRoute.snapshot.paramMap.get('key');

    let ref = this._service.getAlumnos().orderByKey().equalTo(this.key);
    
    await ref.once("value", snapshot => {
      snapshot.forEach(child => {
        this.item = child.val();
      })
    })
    
  }

  key: string;
  item: object = {};
}
