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
    loadComponent: () => import('./pages/users/list/list').then((m) => m.List),
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./pages/users/photos/user-photos').then((m) => m.UserPhotos),
    children: [
      {
        path: 'photos',
        loadComponent: () => import('./pages/users/photos/user-photos').then((m) => m.UserPhotos),
      },
      {
        path: 'posts',
        loadComponent: () => import('./pages/users/posts/posts').then((m) => m.Posts),
      },
      {
        path: 'todos',
        loadComponent: () => import('./pages/users/todos/todos').then((m) => m.Todos),
      },
    ],
  },
  // {
  //   path: 'users/:id/photos',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./pages/users/photos/user-photos').then((m) => m.UserPhotos),
  // },
  // {
  //   path: 'users/:id/posts',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./pages/users/posts/posts').then((m) => m.Posts),
  // },
  // {
  //   path: 'users/:id/todos',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./pages/users/todos/todos').then((m) => m.Todos),
  // },
];
