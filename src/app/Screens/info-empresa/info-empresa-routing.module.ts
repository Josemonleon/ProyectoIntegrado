import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoEmpresaPage } from './info-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: InfoEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoEmpresaPageRoutingModule {}
