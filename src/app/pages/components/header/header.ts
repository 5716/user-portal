import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Auth } from '../../../auth';

@Component({
  selector: 'app-header',
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button nzDanger (click)="logout()">
    <nz-icon nzType="logout" nzTheme="outline" />გასვლა
  </button>

  `,
  styleUrl: './header.css',
})
export class Header {
  private auth = inject(Auth);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
