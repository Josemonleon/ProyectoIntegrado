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

  esCorrecto(){

    let correoOK, nombreOK, apellidosOK, tutorOK, localidadOK, cursoOK;

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

    if(correoOK && nombreOK && apellidosOK && tutorOK && localidadOK && cursoOK){
      console.log("Todo correcto");
      return true;
    } else {
      console.log("Algun error");
      return false;
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
  empresas: IEmpresaKey[] = [];
}
