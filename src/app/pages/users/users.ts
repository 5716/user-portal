import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Auth } from '../../auth';

@Component({
  selector: 'app-users',
  imports: [NzTableModule, NzIconModule, NzButtonModule, RouterLink],
  template: `
    <div class="max-w-3xl mx-auto p-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold">მომხმარებლები</h1>
        <div class="flex items-center gap-2">
          <button nz-button nzType="primary" routerLink="/dashboard">
            <nz-icon nzType="dashboard" nzTheme="outline" />მართვის პანელი
          </button>
          <button nz-button nzDanger (click)="logout()">
            <nz-icon nzType="logout" nzTheme="outline" />გასვლა
          </button>
        </div>
      </div>

      <nz-table #t [nzData]="rows()" [nzShowPagination]="false">
        <thead>
          <tr>
            <th>სრული სახელი</th>
            <th>ელ-ფოსტა</th>
            <th>OS</th>
          </tr>
        </thead>
        <tbody>
          @for (row of t.data; track row.id) {
            <tr class="cursor-pointer hover:bg-gray-50" (click)="goTo(row.id)">
              <td class="text-blue-600 underline">{{ row.name }}</td>
              <td>{{ row.email }}</td>
              <td><nz-icon nzType="{{ row.id > 5 ? 'apple' : 'windows' }}" nzTheme="fill" /></td>
            </tr>
          }
        </tbody>
      </nz-table>
    </div>
  `,
})
export class Users {
  private router = inject(Router);
  private auth = inject(Auth);

  placeholderUsersResource = httpResource<PlaceholderUser[]>(
    () => ({ url: `https://jsonplaceholder.typicode.com/users` }),
    { defaultValue: [] },
  );

  rows = computed(() => this.placeholderUsersResource.value());

  goTo(id: number) {
    this.router.navigate(['/users', id]);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
