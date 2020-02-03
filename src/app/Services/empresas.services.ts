import {Injectable} from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'

@Injectable()

export class EmpresasService {
    constructor(private _db:AngularFireDatabase) {
        
    }


    //Metodo para recuperar los datos de FireBase en conreto del nodo 'Empresas'
    getListaEmpresas(): firebase.database.Reference{
        let ref = this._db.database.ref("Empresas");
        return ref;

    }


    




}




