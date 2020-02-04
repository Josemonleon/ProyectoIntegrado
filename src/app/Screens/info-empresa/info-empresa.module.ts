import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoEmpresaPageRoutingModule } from './info-empresa-routing.module';

import { InfoEmpresaPage } from './info-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoEmpresaPageRoutingModule
  ],
  declarations: [InfoEmpresaPage]
})
export class InfoEmpresaPageModule {}
