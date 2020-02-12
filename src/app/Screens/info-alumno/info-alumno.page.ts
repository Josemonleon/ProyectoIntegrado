import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlumno } from 'src/app/interfaces';
import { AlumnosService } from 'src/app/Services/alumnos.service';
import { EmpresasService } from 'src/app/Services/empresas.services';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-info-alumno',
  templateUrl: './info-alumno.page.html',
  styleUrls: ['./info-alumno.page.scss'],
})
export class InfoAlumnoPage implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _service: AlumnosService, private _empService:EmpresasService,
    private router: Router, private alertController: AlertController) { }

  async ngOnInit() {
    //this.key = this._activatedRoute.snapshot.paramMap.get('key');
  }

  async ionViewWillEnter(){
    this.key = this._activatedRoute.snapshot.paramMap.get('key');

    await this.descargarDatos();
  }
  
  empresa: Object = {}
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
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro de que quiere eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Eliminar',
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
