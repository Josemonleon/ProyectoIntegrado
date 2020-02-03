import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmpresaPage } from './add-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: AddEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEmpresaPageRoutingModule {}
