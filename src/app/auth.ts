import { Injectable, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Auth {
  loggedIn = signal(localStorage.getItem('loggedIn') === 'true');

  login()  { this.loggedIn.set(true);  localStorage.setItem('loggedIn', 'true'); }
  logout() { this.loggedIn.set(false); localStorage.removeItem('loggedIn'); }
}

export const authGuard: CanActivateFn = () =>
  inject(Auth).loggedIn() ? true : inject(Router).createUrlTree(['/login']);