import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Auth } from '../../../core/services/auth';
import { Menu } from '../menu/menu';


@Component({
  selector: 'app-header',
  imports: [NzIconModule, NzButtonModule, Menu],
  host: { class: 'flex items-center justify-end bg-[rgb(60,60,60)] p-2' },
  template: `

    <app-menu></app-menu>
    <button nz-button nzDanger nzGhost (click)="logout()">
    {{ this.loggedUser()? this.loggedUser()?.firstName + ' ' + this.loggedUser()?.lastName : '' }}
    <nz-icon nzType="logout" nzTheme="outline" />
    </button>
  `,
})
export class Header {
  private auth = inject(Auth);
  private router = inject(Router);

  loggedUser = this.auth.loggedUser;

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
