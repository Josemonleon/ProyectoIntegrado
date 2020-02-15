import { Component, OnInit } from '@angular/core';
import { IAlumno, IAlumnoKey } from 'src/app/interfaces';
import { AlumnosService } from '../../Services/alumnos.service';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  constructor(private _service: AlumnosService, private navController: NavController, private afAuth: AngularFireAuth,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.descargarDatos();
  }

  alumnos: IAlumnoKey[] = [];
  nombreAlumno: string;

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

  onLogout(){
    this.afAuth.auth.signOut();
    this.navController.navigateRoot(['/login']); 
  }

  async filtroAlumnos(){
    this.alumnos = [];

    let ref = this._service.getAlumnos();
    await ref.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        value.key=child.key;

        if(value.Nombre.toLowerCase().includes(this.nombreAlumno.toLowerCase()) || 
          value.Apellidos.toLowerCase().includes(this.nombreAlumno.toLowerCase()) ||
          (value.Nombre + " " + value.Apellidos).toLowerCase().includes(this.nombreAlumno.toLowerCase())
        ){ 
          this.alumnos.push(value);
        }

      })
    })
  }

}
