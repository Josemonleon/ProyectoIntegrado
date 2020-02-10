import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnosAsignadosPage } from './alumnos-asignados.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnosAsignadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosAsignadosPageRoutingModule {}
