import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Auth } from '../../auth';

@Component({
  selector: 'app-dashboard',
  imports: [NzButtonModule, NzIconModule, RouterLink],
  template: `
    <div class="max-w-3xl mx-auto p-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold">მართვის პანელი</h1>
        <div class="flex items-center gap-2">
          <button nz-button nzType="primary" routerLink="/users">
            <nz-icon nzType="user" nzTheme="outline" />მომხმარებლები
          </button>
          <button nz-button nzDanger (click)="logout()">
            <nz-icon nzType="logout" nzTheme="outline" />გასვლა
          </button>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="bg-white p-6 rounded-xl shadow text-center">
          <p class="text-3xl font-semibold">{{ total() }}</p>
          <p class="text-sm text-gray-500 mt-1">რეგისტრირებული მომხმარებლები</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow text-center">
          <p class="text-3xl font-semibold">{{ windowsCount() }}</p>
          <p class="text-sm text-gray-500 mt-1">Windows-ის მომხმარებლები</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow text-center">
          <p class="text-3xl font-semibold">{{ appleCount() }}</p>
          <p class="text-sm text-gray-500 mt-1">MacOS-ის მომხმარებლები</p>
        </div>
      </div>
    </div>
  `,
})
export class Dashboard {
  private router = inject(Router);
  private auth = inject(Auth);

  usersResource = httpResource<PlaceholderUser[]>(
    () => ({ url: `https://jsonplaceholder.typicode.com/users` }),
    { defaultValue: [] },
  );

  total = computed(() => this.usersResource.value().length);
  appleCount = computed(() => this.usersResource.value().filter((u) => u.id > 5).length);
  windowsCount = computed(() => this.usersResource.value().filter((u) => u.id <= 5).length);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
