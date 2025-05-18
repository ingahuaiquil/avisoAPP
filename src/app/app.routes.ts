import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'crear-aviso',
    pathMatch: 'full',
  },
  {
    path: 'lista-avisos',
    loadComponent: () => import('./pages/lista-avisos/lista-avisos.page').then( m => m.ListaAvisosPage)
  },
  {
    path: 'crear-aviso',
    loadComponent: () => import('./pages/crear-aviso/crear-aviso.page').then( m => m.CrearAvisoPage)
  },
];
