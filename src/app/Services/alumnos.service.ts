import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()

export class AlumnosService {

    constructor(private _db: AngularFireDatabase) { }
  
    getAlumnos(): firebase.database.Reference {
        let ref = this._db.database.ref("Alumnos");
        return ref;
    }
}