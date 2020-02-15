import { Component, OnInit } from '@angular/core';
import { IAlumno, IEmpresa, IEmpresaKey } from 'src/app/interfaces';
import { AlumnosService } from 'src/app/Services/alumnos.service';
import { EmpresasService } from 'src/app/Services/empresas.services';
import { ToastController, NavController } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.page.html',
  styleUrls: ['./add-alumno.page.scss'],
})
export class AddAlumnoPage implements OnInit {

  constructor(private _service: AlumnosService, public toastController: ToastController, private _empService: EmpresasService,
    private navController : NavController, private _translate: TranslateService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let ref = this._empService.getListaEmpresas();
    ref.once("value", snapshot =>{
      snapshot.forEach(child => {
        let value = child.val();
        value.key = child.key;
        this.empresas.push(value);
      })
    })

    let ref2 = this._service.getAlumnos();
    ref2.once("value", snapshot =>{
      snapshot.forEach(child => {
        let value = child.val();
        this.alumnos.push(value);
      })
    })

  }

  empresas: IEmpresaKey[] = [];
  alumnos: IAlumno[] = [];

  nombre: string = "";
  apellidos: string = "";
  curso: string = "";
  localidad: string = "";
  tutor: string = "";
  correo: string = "";
  empresa: string = "Ninguna";
  dni: string = "";

  volver(){
    this.navController.navigateRoot(['/home']); 
  }

  addAlumno(){
  //Añade alumnos en la bbdd si cumple las comprobaciones.

    let alumno: IAlumno;
    alumno = {
      "Apellidos": this.apellidos,
      "Curso": this.curso,
      "Email": this.correo,
      "Localidad": this.localidad,
      "Nombre": this.nombre,
      "Tutor": this.tutor,
      "Empresa": this.empresa,
      "Dni": this.dni
    }

    if(this.esCorrecto()){ //Si todos los campos tienen el formato correcto
      if(!this.existeDni()){ //Si el dni no esta en uso
        this._service.setAlumno(alumno);
        this.presentToast();
      } else {
        this._translate.get('PAGES.Add-Alumno.ALUMNO_AÑADIDO').subscribe(
          value => {
            alert(value)
          }
        )
      }
    } else {
      this._translate.get('PAGES.Add-Alumno.DATOS_INCORRECTOS').subscribe(
        value => {
          alert(value)
        }
      )
    }
  }

  async presentToast() {
    let alertTitle;

    this._translate.get('PAGES.Add-Alumno.ALUMNO_AÑADIDO').subscribe(
      value => {
        alertTitle = value;
      }
    )

    const toast = await this.toastController.create({
      message: alertTitle,
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

  async presentToastDniLetraIncorrecta() {
    let alertTitle;

    this._translate.get('PAGES.Add-Alumno.LETRA_INCORRECTA').subscribe(
      value => {
        alertTitle = value;
      }
    )
    
    const toast = await this.toastController.create({
      message: alertTitle,
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

  async presentToastDniIncorrecto() {

    let alertTitle;

    this._translate.get('PAGES.Add-Alumno.DNI_INCORRECTO').subscribe(
      value => {
        alertTitle = value;
      }
    )
    
    const toast = await this.toastController.create({
      message: alertTitle,
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

  //Comprueba que los campos tienen los formatos correctos.
  esCorrecto(){

    let dniOK, correoOK, nombreOK, apellidosOK, tutorOK, localidadOK, cursoOK;

    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regex2 = /^[a-zA-ZÀ-ÿ .]{2,}$/;

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

    dniOK = this.nif(); 

    if(correoOK && nombreOK && apellidosOK && tutorOK && localidadOK && cursoOK && dniOK){
      return true;
    } else {
      return false;
    }

  }

  //Método para comprobar que el DNI tiene el formato correcto
  nif(): boolean {
    var dniOK
    var numero
    var letr
    var letra
    var expresion_regular_dni
   
    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
   
    if(expresion_regular_dni.test (this.dni) == true){
       numero = this.dni.substr(0,this.dni.length-1);
       letr = this.dni.substr(this.dni.length-1,1);
       numero = numero % 23;
       letra='TRWAGMYFPDXBNJZSQVHLCKET';
       letra=letra.substring(numero,numero+1);
      if (letra!=letr.toUpperCase()) {
         dniOK = false;
         this.presentToastDniLetraIncorrecta();
       }else{
         dniOK = true;
       }
    }else{
       dniOK = false;
       this.presentToastDniIncorrecto();
     }

     return dniOK
  }

  //Comprueba que existe Alumno con el dni.
  existeDni(){
    let existe: boolean = false;

    for(let i=0; i<this.alumnos.length; i++){
      if(this.dni == this.alumnos[i].Dni){
        existe = true;
      }
    }

    return existe;
  }

}
