import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEmpresaPageRoutingModule } from './edit-empresa-routing.module';

import { EditEmpresaPage } from './edit-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEmpresaPageRoutingModule
  ],
  declarations: [EditEmpresaPage]
})
export class EditEmpresaPageModule {}
