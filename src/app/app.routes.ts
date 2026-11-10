import { Routes } from '@angular/router';
import { authGuard } from './auth';
import { CryptoService } from './pages/market/services/crypto';
import { WeatherService } from './pages/weather/services/weather';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
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
    path: 'shopping',
    canActivate: [authGuard],
    providers: [CryptoService], // [ShoppingService, Crypto],
    loadComponent: () => import('./pages/shopping/shopping').then((m) => m.Shopping),
  },
  {
    path: 'weather',
    canActivate: [authGuard],
    providers: [WeatherService],
    loadComponent: () => import('./pages/weather/weather').then((m) => m.WeatherPage),
  },
  {
    path: 'market',
    canActivate: [authGuard],
    providers: [CryptoService],
    loadComponent: () => import('./pages/market/market').then((m) => m.Market),
  },
  {
    path: '**',
    data: { hideBars: true },
    loadComponent: () => import('./shared/ui/404/404').then((c) => c.Page404),
  },
];
