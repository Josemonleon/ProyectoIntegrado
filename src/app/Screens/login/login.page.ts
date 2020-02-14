import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';

// Componentes externos que realizan peticiones
import { TranslateService } from '@ngx-translate/core';

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
  idioma: string = "es";

  constructor(private _authService : AuthService, private router: Router, private alertController: AlertController,
    public toastController: ToastController, public navCtrl: NavController, private _translate: TranslateService) { }

  ngOnInit() {
    console.log('\nregister');
    console.log(this.register);
    this._translate.use(this.idioma);
  }

  cambiaIdioma() {
    console.log(`Traduzco a: ${this.idioma}`);
    this._translate.use(this.idioma);
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
      const url = `/home/${this.idioma}`;
      this.router.navigateByUrl(url);
    }
  }

  async verInfo() {
    let alertTitle;

    this._translate.get('PAGES.Login.INFO').subscribe(
      value => {
        alertTitle = value;
      }
    )
    
    const alert = await this.alertController.create({
      header: 'Información',
      message: alertTitle
    });

    await alert.present();
  }

  async presentToast() {
    let alertTitle;

    this._translate.get('PAGES.Login.ALERT_NUEVACUENTA').subscribe(
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

}
