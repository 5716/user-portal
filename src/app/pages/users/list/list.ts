import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Auth } from '../../../auth';

@Component({
  imports: [NzTableModule, NzIconModule, NzButtonModule, RouterLink],
  selector: 'app-list',
  styleUrl: './list.css',
  templateUrl: './list.html',
})
export class List {
  private router = inject(Router);
  private auth = inject(Auth);

  placeholderUsersResource = httpResource<PlaceholderUser[]>(
    () => ({ url: `https://jsonplaceholder.typicode.com/users` }),
    { defaultValue: [] },
  );

  rows = computed(() => this.placeholderUsersResource.value());

  goTo(id: number) {
    this.router.navigate(['/users', id, 'photos']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
