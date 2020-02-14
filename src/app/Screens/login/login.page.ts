import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  register : boolean = false;
  botonAlta :string = "No tengo usuario";

  //nombre: string;
  email: string;
  password:string;


  constructor(private _authService : AuthService, private router: Router, private alertController: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {
    console.log('\nregister');
    console.log(this.register);
  }


  changeRegisterState(){
    this.register =!this.register;
    this.register ? this.botonAlta="Volver a Acceso" : this.botonAlta="No tengo usuario";
    console.log('\nregister');
    console.log(this.register);
  }

  async onRegister(){
    const user = await this._authService.onRegister(this.email, this.password)
    if(user){
      this.presentToast();
    }
  }

  async onLogin(){
    const user = await this._authService.onLogin(this.email, this.password)

    if(user){
      console.log("Sesión iniciada correctamente");
      this.router.navigateByUrl('/home')
    }
  }

  async verInfo() {
    const alert = await this.alertController.create({
      header: 'Información',
      message:
        "BeKeen la app de gestión eficiente para la asignación de alumnos a empresas. Accede a toda la información de forma rápida y fácil. <br><br>" + 
        "Desarrollada por: <br><br> · Sergio Girona Soriano <br> · Glòria Sedó Guillem <br> · Álvaro Argüelles Delgado <br> · Francisco Lobo García <br> · José Monleón López"
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cuenta creada correctamente',
      duration: 4000,
      position: "bottom"
    });
    toast.present();
  }

}
