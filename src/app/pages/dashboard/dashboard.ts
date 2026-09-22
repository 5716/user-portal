import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Auth } from '../../auth';

interface User {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, NzTableModule, NzSelectModule, NzButtonModule, NzIconModule],
  template: `
    <div class="max-w-3xl mx-auto p-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold">მართვის პანელი</h1>
        <button nz-button nzDanger (click)="logout()">გასვლა</button>
      </div>

      <span class="pr-2 text-xs text-gray-500">ფილტრი</span>
      <nz-select [(ngModel)]="filter" class="w-48 mb-4">
      <!-- <nz-select [ngModel]="filter()" (ngModelChange)="filter.set($event)" class="w-48 mb-4"> -->
        <nz-option nzValue="Active" nzLabel="აქტიური"></nz-option>
        <nz-option nzValue="Inactive" nzLabel="არააქტიური"></nz-option>
      </nz-select><button nz-button nzType="primary" (click)="filter.set(null)">X</button>

      <nz-table #t [nzData]="rows()" [nzShowPagination]="false">
        <thead>
          <tr>
            <th>სახელი</th>
            <th>როლი</th>
            <th>სტატუსი</th>
          </tr>
        </thead>
        <tbody>
          @for (row of t.data; track row.id) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.role }}</td>
              <!-- <td>{{ row.isActive ? 'აქტიური ✔' : 'არააქტიური ❌' }}</td>
                -->
              <td><nz-icon nzType="{{ row.isActive ? 'check' : 'close' }}" nzTheme="outline" /></td>
            </tr>
          }
        </tbody>
      </nz-table>
    </div>
  `,
})
export class Dashboard {
  private router = inject(Router);
  private auth = inject(Auth);

  filter = signal<string | null>(null);

  users: User[] = [
    { id: 1, name: 'კახა', role: 'ადმინისტრატორი', isActive: true },
    { id: 2, name: 'Helpdesk', role: 'საპორტი', isActive: false },
    { id: 3, name: 'საბა', role: 'სტუმარი', isActive: true },
    { id: 4, name: 'SysAdmin', role: 'ადმინისტრატორი', isActive: true },
    { id: 5, name: 'მარიამი', role: 'სტუმარი', isActive: false },
  ];

  rows = computed(() =>
    this.filter() === null ? this.users : this.users.filter((u) => (this.filter() === 'Active' ? u.isActive : !u.isActive)),
  );

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
