import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/Services/empresas.services';
import { ActivatedRoute } from '@angular/router';
import { IEmpresaKey, IEmpresa} from 'src/app/interfaces';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  constructor(private _toastCtrl: ToastController, private _service: EmpresasService, private _activatedRoute: ActivatedRoute, private route: Router) { }

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
    const toast = await this._toastCtrl.create({
      message: 'Empresa modificada correctamente',
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
      alert("Datos erróneos")
    }
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
