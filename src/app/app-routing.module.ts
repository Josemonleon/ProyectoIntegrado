import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./Screens/login/login.module').then( m => m.LoginPageModule)
  },
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
  },
  {
    path: 'add-empresa',
    loadChildren: () => import('./Screens/add-empresa/add-empresa.module').then( m => m.AddEmpresaPageModule)
  },
  {
    path: 'info-empresa/:key',
    loadChildren: () => import('./Screens/info-empresa/info-empresa.module').then( m => m.InfoEmpresaPageModule)
  },
  {
    path: 'info-empresa/:key/:bool',
    loadChildren: () => import('./Screens/info-empresa/info-empresa.module').then( m => m.InfoEmpresaPageModule)
  },
  {
    path: 'edit-alumno',
    loadChildren: () => import('./Screens/edit-alumno/edit-alumno.module').then( m => m.EditAlumnoPageModule)
  },
  {
    path: 'edit-empresa/:key',
    loadChildren: () => import('./Screens/edit-empresa/edit-empresa.module').then( m => m.EditEmpresaPageModule)
  },
  {
    path: 'edit-alumno/:key',
    loadChildren: () => import('./Screens/edit-alumno/edit-alumno.module').then( m => m.EditAlumnoPageModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./Screens/login/login.module').then( m => m.LoginPageModule)
  // },

  {
    path: 'edit-empresa/:key',
    loadChildren: () => import('./Screens/edit-empresa/edit-empresa.module').then( m => m.EditEmpresaPageModule)
  },
  {
    path: 'ver-valoraciones',
    loadChildren: () => import('./Screens/ver-valoraciones/ver-valoraciones.module').then( m => m.VerValoracionesPageModule)
  },
  {
    path: 'ver-valoraciones/:empresa',
    loadChildren: () => import('./Screens/ver-valoraciones/ver-valoraciones.module').then( m => m.VerValoracionesPageModule)
  },
  {
    path: 'alumnos-asignados',
    loadChildren: () => import('./Screens/alumnos-asignados/alumnos-asignados.module').then( m => m.AlumnosAsignadosPageModule)
  },
  {
    path: 'alumnos-asignados/:empresaKey',
    loadChildren: () => import('./Screens/alumnos-asignados/alumnos-asignados.module').then( m => m.AlumnosAsignadosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
