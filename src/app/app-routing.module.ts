import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
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
    path: 'add-alumno',
    loadChildren: () => import('./Screens/add-alumno/add-alumno.module').then( m => m.AddAlumnoPageModule)
  },
  {
    path: 'info-alumno',
    loadChildren: () => import('./Screens/info-alumno/info-alumno.module').then( m => m.InfoAlumnoPageModule)
  },
  {
    path: 'info-alumno/:key',
    loadChildren: () => import('./Screens/info-alumno/info-alumno.module').then( m => m.InfoAlumnoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
