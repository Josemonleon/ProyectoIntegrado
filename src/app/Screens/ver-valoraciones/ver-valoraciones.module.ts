import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerValoracionesPageRoutingModule } from './ver-valoraciones-routing.module';

import { VerValoracionesPage } from './ver-valoraciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerValoracionesPageRoutingModule
  ],
  declarations: [VerValoracionesPage]
})
export class VerValoracionesPageModule {}
