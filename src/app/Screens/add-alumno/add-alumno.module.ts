import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAlumnoPageRoutingModule } from './add-alumno-routing.module';

import { AddAlumnoPage } from './add-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAlumnoPageRoutingModule
  ],
  declarations: [AddAlumnoPage]
})
export class AddAlumnoPageModule {}
