import {Injectable} from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { IValoracion } from '../interfaces';

@Injectable()

export class ValoracionesService {

    constructor(private _db: AngularFireDatabase) { }
  
    getValoraciones(): firebase.database.Reference {
        let ref = this._db.database.ref("Valoraciones");
        return ref;
    }

    setValoracion(valoracion: IValoracion) {
        let ref = this._db.database.ref("Valoraciones");
        ref.push(valoracion);
    }
}