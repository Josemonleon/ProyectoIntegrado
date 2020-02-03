import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  register : boolean = false;
  botonAlta :string = "No tengo usuario";


  constructor() { }

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

}
