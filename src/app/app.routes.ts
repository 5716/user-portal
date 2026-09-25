import { Routes } from '@angular/router';
import { authGuard } from './auth';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/users/users').then((m) => m.Users),
  },
  {
    path: 'users/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/users/user-photos').then((m) => m.UserPhotos),
  },
];
