import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEmpresaPage } from './edit-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: EditEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEmpresaPageRoutingModule {}
