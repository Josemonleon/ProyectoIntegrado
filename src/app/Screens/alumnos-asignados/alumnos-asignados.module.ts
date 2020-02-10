import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnosAsignadosPageRoutingModule } from './alumnos-asignados-routing.module';

import { AlumnosAsignadosPage } from './alumnos-asignados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnosAsignadosPageRoutingModule
  ],
  declarations: [AlumnosAsignadosPage]
})
export class AlumnosAsignadosPageModule {}
