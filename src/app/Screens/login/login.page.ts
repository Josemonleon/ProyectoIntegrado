import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

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


  constructor(private _authService : AuthService, private router: Router) { }

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
  }

  async onLogin(){
    const user = await this._authService.onLogin(this.email, this.password)

    if(user){
      console.log("Sesion iniciada correctamente");
      this.router.navigateByUrl('/home')
    }
  }



}
