import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
    providedIn: 'root'
})

export class AuthService{
    public isLogged : any = false;

    constructor(public afAuth: AngularFireAuth){

        afAuth.authState.subscribe(user => (this.isLogged=user ));
    }


    async onLogin (email:string, password : string) {
        try{
            return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        }catch(error){
            console.log('Login error', error);
        }
    }
    async onRegister (email: string, password : string){
        try{
            return await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

        }catch(error){
            console.log(error.message);
            let emailUsado = 'The email address is already in use by another account.';
            let contraseña = 'The password must be 6 characters long or more.';
            if(error.message === emailUsado){
                return 1;
            } else if(error.message === contraseña){
                return 2;
            } 
        }
    }
}