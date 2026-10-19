import { Routes } from '@angular/router';
import { authGuard } from './auth';

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
    loadComponent: () => import('./pages/shopping/shopping').then((m) => m.Shopping),
  },
  {
    path: 'weather',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/weather/weather').then((m) => m.WeatherPage),
  },
  {
    path: 'market',
    canActivate: [authGuard],
    data: {
      title: 'კრიპტო ბაზარი',
      url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10',
      columns: [
        { key: 'market_cap_rank', label: '#' },
        { key: 'name', label: 'სახელი' },
        { key: 'current_price', label: 'ფასი ($)' },
        { key: 'price_change_percentage_24h', label: '24სთ (%)' },
      ],
    },
    loadComponent: () => import('./pages/section/section').then((m) => m.Section),
  },
  {
    path: '**',
    data: { hideBars: true },
    loadComponent: () => import('./shared/ui/user/404/404').then((c) => c.Page404),
  },
];
