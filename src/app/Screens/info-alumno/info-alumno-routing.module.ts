import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoAlumnoPage } from './info-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: InfoAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoAlumnoPageRoutingModule {}
