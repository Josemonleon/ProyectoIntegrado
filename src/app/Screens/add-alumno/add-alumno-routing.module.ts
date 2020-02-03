import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAlumnoPage } from './add-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: AddAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAlumnoPageRoutingModule {}
