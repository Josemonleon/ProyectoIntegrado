import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database' 
import { IEmpresa } from '../../interfaces';
import {EmpresasService} from '../../Services/empresas.services';

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



  constructor(private _toastCtrl: ToastController, private _db: AngularFireDatabase, private _service: EmpresasService) { }

  ngOnInit() {
  }





  async presentToast() {  //Muestra el mensaje 'message' en el momento de ser creado. Se utiliza siendo llamado.
    const toast = await this._toastCtrl.create({
      message: 'Empresa añadida correctamente',
      duration: 1000,
      position: "bottom"
    });
    toast.present();
  }


  insertarEmpresa(){
    let empresa: IEmpresa={
                                    "Nombre": this.nombre,
                                    "Localidad": this.localidad,
                                    "Contacto": this.contacto,                             
                                  };


    //Llamamos a la función que añade empresa en la bbdd de FireBase. Le pasamos el empresa por parametro.
    this._service.setEmpresa(empresa);


    this.presentToast();  //Se llama para que muestre el mensaje de que ha sido insertado un producto.

  }









}
