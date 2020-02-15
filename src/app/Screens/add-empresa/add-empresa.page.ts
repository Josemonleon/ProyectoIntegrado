import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database'
import { IEmpresa } from '../../interfaces';
import { EmpresasService } from '../../Services/empresas.services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.page.html',
  styleUrls: ['./add-empresa.page.scss'],
})
export class AddEmpresaPage implements OnInit {

  //Datos de la empresa nueva
  nombre: string = "";
  localidad: string = "";
  contacto: string = "";
  nif: string = "";

  constructor(private _toastCtrl: ToastController, private _db: AngularFireDatabase, private _service: EmpresasService,
    private navController: NavController, private _translate: TranslateService) { }

  empresas: IEmpresa[] = [];

  ngOnInit() {
    let ref = this._service.getListaEmpresas();
    ref.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();
        value.key = child.key;
        this.empresas.push(value);
      })
    })
  }

  async presentToast() {  //Muestra el mensaje 'message' en el momento de ser creado. Se utiliza siendo llamado.

    let alertTitle;

    this._translate.get('PAGES.Add-Empresa.EMPESA_AÑADIDA').subscribe(
      value => {
        alertTitle = value;
      }
    )

    const toast = await this._toastCtrl.create({
      message: alertTitle,
      duration: 1000,
      position: "bottom"
    });
    toast.present();
  }

  async presentToastDniIncorrecto() {

    let alertTitle;

    this._translate.get('PAGES.Add-Empresa.NIF_INCORRECTO').subscribe(
      value => {
        alertTitle = value;
      }
    )

    const toast = await this._toastCtrl.create({
      message: alertTitle,
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

  async presentToastDniLetraIncorrecta() {

    let alertTitle;

    this._translate.get('PAGES.Add-Empresa.LETRA_INCORRECTA').subscribe(
      value => {
        alertTitle = value;
      }
    )

    const toast = await this._toastCtrl.create({
      message: alertTitle,
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }


  insertarEmpresa() {
    let empresa: IEmpresa = {
      "Nombre": this.nombre,
      "Localidad": this.localidad,
      "Contacto": this.contacto,
      "Nif": this.nif,
      "Valoracion": 0
    };

    //Llamamos a la función que añade empresa en la bbdd de FireBase. Le pasamos el empresa por parametro
    if (this.esCorrecto()) {
      //Si el dni no esta en uso
      if (!this.existeDniEmpresa()) {
        this._service.setEmpresa(empresa);
        this.presentToast();  //Se llama para que muestre el mensaje de que ha sido insertado un producto.
      } else {
        this._translate.get('PAGES.Add-Empresa.NIF_USADO').subscribe(
          value => {
            alert(value)
          }
        )
      }
    } else {
      this._translate.get('PAGES.Add-Empresa.DATOS_INCORRECTOS').subscribe(
        value => {
          alert(value)
        }
      )
    }

  }

  //Funcion para comprobar si los datos introducidos son correctos
  esCorrecto() {

    let nombreOK, localidadOK, contactoOK, NifOK;

    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regex2 = /^[a-zA-ZÀ-ÿ .]{2,}$/;

    if (regex.test(this.contacto)) {
      contactoOK = true;
    } else {
      contactoOK = false;
    }

    (regex2.test(this.nombre)) ? nombreOK = true : nombreOK = false;
    (regex2.test(this.localidad)) ? localidadOK = true : localidadOK = false;

    NifOK = this.nifEmpresa();

    if (nombreOK && localidadOK && contactoOK && NifOK) {
      return true;
    } else {
      return false;
    }

  }

  nifEmpresa(): boolean {
    var nifOk
    var numero
    var letr
    var letra
    var expresion_regular_dni

    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

    if (expresion_regular_dni.test(this.nif) == true) {
      numero = this.nif.substr(0, this.nif.length - 1);
      letr = this.nif.substr(this.nif.length - 1, 1);
      numero = numero % 23;
      letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
      letra = letra.substring(numero, numero + 1);
      if (letra != letr.toUpperCase()) {
        nifOk = false;
        this.presentToastDniLetraIncorrecta();
      } else {
        nifOk = true;
      }
    } else {
      nifOk = false;
      this.presentToastDniIncorrecto();
    }

    return nifOk;
  }

  existeDniEmpresa() {
    let existe: boolean = false;

    for (let i = 0; i < this.empresas.length; i++) {
      if (this.nif == this.empresas[i].Nif) {
        existe = true;
      }
    }
    return existe;
  }

  volver() {
    this.navController.navigateRoot(['/home/empresas']);
  }

}
