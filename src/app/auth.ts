import { Injectable, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Auth {
  loggedIn = signal(false);

  login()  { this.loggedIn.set(true); }
  logout() { this.loggedIn.set(false); }
}

export const authGuard: CanActivateFn = () =>
  inject(Auth).loggedIn() ? true : inject(Router).createUrlTree(['/login']);