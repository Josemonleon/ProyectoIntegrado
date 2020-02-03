import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},  {
    path: 'alumnos',
    loadChildren: () => import('./Screens/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  },
  {
    path: 'empresas',
    loadChildren: () => import('./Screens/empresas/empresas.module').then( m => m.EmpresasPageModule)
  },
  {
    path: 'add-empresa',
    loadChildren: () => import('./Screens/add-empresa/add-empresa.module').then( m => m.AddEmpresaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
