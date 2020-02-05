import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerValoracionesPage } from './ver-valoraciones.page';

const routes: Routes = [
  {
    path: '',
    component: VerValoracionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerValoracionesPageRoutingModule {}
