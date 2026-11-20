import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from './environments/environments';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);

  token = signal(localStorage.getItem('token'));
  loggedIn = computed(() => !!this.token());

  login(username: string, password: string) {
    return this.http
      .post<{ accessToken: string }>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.accessToken);
          this.token.set(res.accessToken);
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}

export const authGuard: CanActivateFn = () =>
  inject(Auth).loggedIn() ? true : inject(Router).createUrlTree(['/login']);
