import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

// Componentes externos que realizan peticiones
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Configuración de traducción
import { customTranslateLoader } from '../app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'alumnos'
      },
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: "alumnos/:idioma",
            loadChildren: () => import('../Screens/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
          },
          {
            path: "empresas",
            loadChildren: () => import('../Screens/empresas/empresas.module').then( m => m.EmpresasPageModule)
          },
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
