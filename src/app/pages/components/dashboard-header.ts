import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Auth } from '../../auth';

@Component({
  selector: 'app-dashboard-header',
  imports: [NzIconModule, NzButtonModule, RouterLink],
  templateUrl: './dashboard-header.html',
})
export class DashboardHeaderComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
