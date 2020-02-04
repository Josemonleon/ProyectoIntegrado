import {Injectable} from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { IEmpresa, IEmpresaKey } from '../interfaces';


@Injectable()

export class EmpresasService {
    constructor(private _db:AngularFireDatabase) {
        
    }


    //Metodo para recuperar los datos de FireBase en conreto del nodo 'Empresas'
    getListaEmpresas(): firebase.database.Reference{
        let ref = this._db.database.ref("Empresas");
        return ref;

    }


    setEmpresa(empresa: IEmpresa) {
        let ref = this._db.database.ref("Empresas");  //Hacemos referencia al nodo que queremos acceder de la bbdd.
        ref.push(empresa); //Añadimos en la bbdd, en el nodo arriba seleccionado, la empresa pasada por parámetro en la función
    }



    




}




