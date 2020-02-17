import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlumno } from 'src/app/interfaces';
import { AlumnosService } from 'src/app/Services/alumnos.service';
import { EmpresasService } from 'src/app/Services/empresas.services';
import { NavController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-info-alumno',
  templateUrl: './info-alumno.page.html',
  styleUrls: ['./info-alumno.page.scss'],
})
export class InfoAlumnoPage implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _service: AlumnosService, private _empService:EmpresasService,
    private router: Router, private alertController: AlertController, private _translate: TranslateService,
    private afAuth: AngularFireAuth) { }

  async ngOnInit() {
    //this.key = this._activatedRoute.snapshot.paramMap.get('key');
  }

  async ionViewWillEnter(){
    this.key = this._activatedRoute.snapshot.paramMap.get('key');
    this.email = this.afAuth.auth.currentUser.email;
    await this.descargarDatos();
  }
  
  empresa: Object = {}
  key: string;
  email: string;
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

  async descargarDatos(){
    
    let ref = this._service.getAlumnos().orderByKey().equalTo(this.key);
    await ref.once("value", snapshot => {
      snapshot.forEach(child => {
        this.item = child.val();
      })
    })

    if(this.item.Empresa !== "Ninguna"){
      let ref2 = this._empService.getListaEmpresas().orderByKey().equalTo(this.item.Empresa);
      await ref2.once("value", snapshot => {
        snapshot.forEach(child => {
          this.empresa = child.val();
        })
      })
    } else {
      this.empresa = {"Nombre": "Ninguna"}
    }
  }

  elimiarAlumno(){
    let ref = this._service.getAlumnos();

    ref.orderByKey().equalTo(this.key).once("value", snapshot => {
      snapshot.forEach(child => {
        let clave = child.key;
        ref.child(clave).remove();
      })
    })

    console.log("Alumno eliminado correctamente")

    this.router.navigate(['/home']);
  }

  async confirmacion() {
    let alertEliminar;
    this._translate.get('PAGES.Info-Alumno.ALERT_ELIMINAR').subscribe( value => { alertEliminar = value; } )

    let cancelar;
    this._translate.get('PAGES.Info-Alumno.CANCELAR').subscribe( value => { cancelar = value; } )

    let eliminar;
    this._translate.get('PAGES.Info-Alumno.ELIMINAR').subscribe( value => { eliminar = value; } )

    let confirmacion;
    this._translate.get('PAGES.Info-Alumno.CONFIRMACION').subscribe( value => { confirmacion = value; } )

    const alert = await this.alertController.create({
      header: confirmacion,
      message: alertEliminar,
      buttons: [
        {
          text: cancelar,
          role: 'cancel',
        }, {
          text: eliminar,
          handler: () => {
            console.log('Confirm Okay');
            this.elimiarAlumno();
          }
        }
      ]
    });

    await alert.present();
  }

}
