import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoAlumnoPageRoutingModule } from './info-alumno-routing.module';

import { InfoAlumnoPage } from './info-alumno.page';

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
    InfoAlumnoPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [InfoAlumnoPage]
})
export class InfoAlumnoPageModule {}
