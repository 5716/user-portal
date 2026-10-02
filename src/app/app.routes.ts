import { Routes } from '@angular/router';
import { authGuard } from './auth';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },

  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/users/list/list').then((m) => m.List),
  },
  {
    path: 'users/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/users/detail/detail').then((m) => m.Detail),
    children: [
      { path: '', redirectTo: 'photos', pathMatch: 'full' },
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

  {
    path: '**',
    loadComponent: () => import('./pages/404/404').then((c) => c.Page404),
  },
];
