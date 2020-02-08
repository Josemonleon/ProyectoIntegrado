import { Component, OnInit } from '@angular/core';
import { IAlumno, IAlumnoKey } from 'src/app/interfaces';
import { AlumnosService } from '../../Services/alumnos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  constructor(private _service: AlumnosService, private navController: NavController) { }

  ngOnInit() {
    this.descargarDatos();
  }

  alumnos: IAlumnoKey[] = [];

  descargarDatos(){

    this.alumnos = [];

    let ref = this._service.getAlumnos();
    ref.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        value.key=child.key;
        this.alumnos.push(value);
      })
    })
  }

  navAddAlumno(){
    this.navController.navigateRoot(['/add-alumno']); 
  }

  navInfoAlumno(key){
    this.navController.navigateRoot(['/info-alumno/', key]); 
  }

}
