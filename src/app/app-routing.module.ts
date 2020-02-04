import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'alumnos',
    loadChildren: () => import('./Screens/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  },
  {
    path: 'empresas',
    loadChildren: () => import('./Screens/empresas/empresas.module').then( m => m.EmpresasPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Screens/login/login.module').then( m => m.LoginPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
