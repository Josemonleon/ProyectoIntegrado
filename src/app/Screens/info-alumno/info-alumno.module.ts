import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoAlumnoPageRoutingModule } from './info-alumno-routing.module';

import { InfoAlumnoPage } from './info-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoAlumnoPageRoutingModule
  ],
  declarations: [InfoAlumnoPage]
})
export class InfoAlumnoPageModule {}
