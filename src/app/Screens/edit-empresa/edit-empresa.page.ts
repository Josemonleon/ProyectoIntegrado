import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/Services/empresas.services';
import { ActivatedRoute } from '@angular/router';
import { IEmpresaKey, IEmpresa} from 'src/app/interfaces';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.page.html',
  styleUrls: ['./edit-empresa.page.scss'],
})
export class EditEmpresaPage implements OnInit {

  key: string;
  empresa: IEmpresa = {
    "Nombre": "",
    "Localidad": "",
    "Contacto": "",
    "Valoracion": 0,
    "Nif": ""
  }
  bool: boolean = true;

  constructor(private _toastCtrl: ToastController, private _service: EmpresasService, private _activatedRoute: ActivatedRoute, 
    private route: Router, private _translate: TranslateService, private alertController: AlertController) { }

  ngOnInit() {
    this.key = this._activatedRoute.snapshot.paramMap.get("key");

    let ref = this._service.getListaEmpresas();
    ref.orderByKey().equalTo(this.key).once("value", snapshot => {
      snapshot.forEach(child => {
        this.empresa = child.val();
      });
    }
    );
  }

  async presentToast() {  //Muestra el mensaje 'message' en el momento de ser creado. Se utiliza siendo llamado.

    let mensaje;
    this._translate.get('PAGES.Edit-Empresa.CAMBIOS_GUARDADOS').subscribe( value => { mensaje = value; } )

    const toast = await this._toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: "bottom"
    });
    toast.present();
  }

  modificarEmpresa(){

    if(this.esCorrecto()){
      let ref2 = this._service.getListaEmpresas();
      ref2.child(this.key).set(this.empresa); //set es update
      this.presentToast();
    } else {
      this.datosErroneos();
    }
  }

  async datosErroneos() {

    let mensaje;
    this._translate.get('PAGES.Edit-Empresa.DATOS_INCORRECTOS').subscribe( value => { mensaje = value; } )

    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  esCorrecto(){

    let  nombreOK, localidadOK, contactoOK;

    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regex2 = /^[a-zA-ZÀ-ÿ .]{2,}$/;

    if (regex.test(this.empresa.Contacto)) {
      contactoOK = true;
    } else {
      contactoOK = false;
    }

    (regex2.test(this.empresa.Nombre)) ? nombreOK=true : nombreOK=false;
    (regex2.test(this.empresa.Localidad)) ? localidadOK=true : localidadOK=false;

    if(nombreOK && localidadOK && contactoOK){
      return true;
    } else {
      return false;
    }

  }

}
