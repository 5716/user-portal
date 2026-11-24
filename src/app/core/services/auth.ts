import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/development';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);

  token = signal(localStorage.getItem('user_portal_token'));
  loggedIn = computed(() => !!this.token());
  loggedUser = signal<DummyUser | null>(null);

  login(username: string, password: string) {
    return this.http
      .post<DummyUser>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('user_portal_token', res.accessToken);
          this.token.set(res.accessToken);
          this.loggedUser.set(res);
        }),
      );
  }

  logout() {
    localStorage.removeItem('user_portal_token');
    this.token.set(null);
    this.loggedUser.set(null);
  }
}
