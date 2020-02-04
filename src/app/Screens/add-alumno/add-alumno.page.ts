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

  nombre: string = "";
  apellidos: string = "";
  curso: string = "";
  localidad: string = "";
  tutor: string = "";
  correo: string = "";

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

    if(this.esCorrecto()){
      this._service.setAlumno(alumno);
      this.presentToast();
    } else {
      alert("Error en alguno de los campos")
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto añadido correctamente',
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

  esCorrecto(){

    let correoOK, nombreOK, apellidosOK, tutorOK, localidadOK, cursoOK;

    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regex2 = /^[a-zA-Z ]{2,}$/;

    if (regex.test(this.correo)) {
      correoOK = true;
    } else {
      correoOK = false;
    }

    (regex2.test(this.nombre)) ? nombreOK=true : nombreOK=false;
    (regex2.test(this.apellidos)) ? apellidosOK=true : apellidosOK=false;
    (regex2.test(this.tutor)) ? tutorOK=true : tutorOK=false;
    (regex2.test(this.localidad)) ? localidadOK=true : localidadOK=false;
    (regex2.test(this.curso)) ? cursoOK=true : cursoOK=false;

    if(correoOK && nombreOK && apellidosOK && tutorOK && localidadOK && cursoOK){
      console.log("Todo correcto");
      return true;
    } else {
      console.log("Algun error");
      return false;
    }

  }

}
