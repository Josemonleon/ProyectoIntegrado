import { Component, OnInit } from '@angular/core';
import { IAlumno } from 'src/app/interfaces';
import { AlumnosService } from 'src/app/Services/alumnos.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.page.html',
  styleUrls: ['./add-alumno.page.scss'],
})
export class AddAlumnoPage implements OnInit {

  constructor(private _service: AlumnosService, public toastController: ToastController) { }

  ngOnInit() {
  }

  nombre: string;
  apellidos: string;
  curso: string;
  localidad: string;
  tutor: string;
  correo: string;

  addAlumno(){
    let alumno: IAlumno;
    alumno = {
      "Apellidos": this.apellidos,
      "Curso": this.curso,
      "Email": this.correo,
      "Localidad": this.localidad,
      "Nombre": this.nombre,
      "Tutor": this.tutor
    }

    this._service.setAlumno(alumno);

    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto añadido correctamente',
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

}
