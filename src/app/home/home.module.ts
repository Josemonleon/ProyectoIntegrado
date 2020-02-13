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
