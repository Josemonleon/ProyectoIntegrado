import { Component, OnInit } from '@angular/core';
import { IAlumno, IEmpresa, IEmpresaKey } from 'src/app/interfaces';
import { AlumnosService } from 'src/app/Services/alumnos.service';
import { ActivatedRoute } from '@angular/router';
import { EmpresasService } from 'src/app/Services/empresas.services';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-alumno',
  templateUrl: './edit-alumno.page.html',
  styleUrls: ['./edit-alumno.page.scss'],
})
export class EditAlumnoPage implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _service: AlumnosService, 
    private _empService: EmpresasService, private toastController: ToastController) { }

  async ngOnInit() {
    this.key = this._activatedRoute.snapshot.paramMap.get('key');

    let ref = this._service.getAlumnos().orderByKey().equalTo(this.key);
    
    await ref.once("value", snapshot => {
      snapshot.forEach(child => {
        this.item = child.val();
      })
    })

    let ref2 = this._empService.getListaEmpresas();
    await ref2.once("value", snapshot =>{
      snapshot.forEach(child => {
        let value = child.val();
        value.key = child.key;
        this.empresas.push(value);
      })
    })
  }

  guardarCambios(){
    if(this.esCorrecto()){
      let ref2 = this._service.getAlumnos();
      ref2.child(this.key).set(this.item);
      this.presentToast();
    } else {
      alert("Datos erroneos")
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos guardados',
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

  async presentToastDniLetraIncorrecta() {
    const toast = await this.toastController.create({
      message: 'Dni erroneo, la letra del NIF no se corresponde',
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

  async presentToastDniIncorrecto() {
    const toast = await this.toastController.create({
      message: 'Dni erroneo, formato no válido',
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

  esCorrecto(){

    let dniOK, correoOK, nombreOK, apellidosOK, tutorOK, localidadOK, cursoOK;

    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regex2 = /^[a-zA-ZÀ-ÿ .]{2,}$/;

    if (regex.test(this.item.Email)) {
      correoOK = true;
    } else {
      correoOK = false;
    }

    (regex2.test(this.item.Nombre)) ? nombreOK=true : nombreOK=false;
    (regex2.test(this.item.Apellidos)) ? apellidosOK=true : apellidosOK=false;
    (regex2.test(this.item.Tutor)) ? tutorOK=true : tutorOK=false;
    (regex2.test(this.item.Localidad)) ? localidadOK=true : localidadOK=false;
    (regex2.test(this.item.Curso)) ? cursoOK=true : cursoOK=false;

    dniOK = this.nif();    



    if(correoOK && nombreOK && apellidosOK && tutorOK && localidadOK && cursoOK && dniOK){
      console.log("Todo correcto");
      return true;
    } else {
      console.log("Algun error");
      return false;
    }

  }


   nif(): boolean {
    var dniOK
    var numero
    var letr
    var letra
    var expresion_regular_dni
   
    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
   
    if(expresion_regular_dni.test (this.item.Dni) == true){
       numero = this.item.Dni.substr(0,this.item.Dni.length-1);
       letr = this.item.Dni.substr(this.item.Dni.length-1,1);
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

  key: string;
  item: IAlumno = {
    "Apellidos": "",
    "Curso": "",
    "Email": "",
    "Localidad": "",
    "Nombre": "",
    "Tutor": "",
    "Empresa": "",
    "Dni": ""
  };
  empresas: IEmpresaKey[] = [];
}
