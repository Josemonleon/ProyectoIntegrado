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
    
    if(user == 1){
      this.emailUsado();
    }else if(user == 2){ 
      this.errorPassword();
    }else if(user){
      this.presentToast();
      this.changeRegisterState();
    } else {
      this.errorDatos();
    }
  }

  async onLogin(){
    const user = await this._authService.onLogin(this.email, this.password)

    if(user){
      console.log("Sesión iniciada correctamente");
      const url = `/home`;
      this.router.navigateByUrl(url);
    } else {
      this.errorDatos();
    }
  }

  async usuarioInvitado(){
    const user = await this._authService.onLogin("invitadoBeKeen@gmail.com", "123456")

    if(user){
      console.log("Sesión iniciada correctamente");
      const url = `/home`;
      this.router.navigateByUrl(url);
    }
  }

  async errorDatos() {
    let alertTitle;
    this._translate.get('PAGES.Login.ERROR').subscribe( value => { alertTitle = value; })
    
    const alert = await this.alertController.create({ header: 'Info', message: alertTitle });
    await alert.present();
  }

  async emailUsado() {
    let alertTitle;
    this._translate.get('PAGES.Login.USADO').subscribe( value => { alertTitle = value; })
    
    const alert = await this.alertController.create({ header: 'Info', message: alertTitle });
    await alert.present();
  }

  async errorPassword() {
    let alertTitle;
    this._translate.get('PAGES.Login.CONTRASENYA').subscribe( value => { alertTitle = value; })
    
    const alert = await this.alertController.create({ header: 'Info', message: alertTitle });
    await alert.present();
  }

  async verInfo() {
    let alertTitle;

    this._translate.get('PAGES.Login.INFO').subscribe(
      value => {
        alertTitle = value;
      }
    )
    
    const alert = await this.alertController.create({
      header: 'Info',
      message: alertTitle
    });

    await alert.present();
  }

  async infoInvitado() {
    let titulo;
    this._translate.get('PAGES.Login.INVITADO_TITULO').subscribe( value => {titulo = value; })

    let mensaje;
    this._translate.get('PAGES.Login.INFO_INVITADO').subscribe( value => {mensaje = value; })
    
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje
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
