import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoEmpresaPageRoutingModule } from './info-empresa-routing.module';

import { InfoEmpresaPage } from './info-empresa.page';

// Componentes externos que realizan peticiones
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Configuración de traducción
import { customTranslateLoader } from '../../app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoEmpresaPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [InfoEmpresaPage]
})
export class InfoEmpresaPageModule {}
