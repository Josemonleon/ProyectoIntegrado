import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAlumnoPage } from './edit-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: EditAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAlumnoPageRoutingModule {}
