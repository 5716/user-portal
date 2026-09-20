import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Auth {
  loggedIn = false;
  login()  { this.loggedIn = true; }
  logout() { this.loggedIn = false; }
}