import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
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
            path: "alumnos",
            loadChildren: '../Screens/alumnos/alumnos.module#AlumnosPageModule'
          },
          {
            path: "empresas",
            loadChildren: '../Screens/empresas/empresas.module#EmpresasPageModule'
          },
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
