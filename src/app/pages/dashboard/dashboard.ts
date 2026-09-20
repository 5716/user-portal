import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Auth } from '../../auth';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, NzTableModule, NzSelectModule, NzButtonModule],
  template: `
    <div class="max-w-3xl mx-auto p-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold">მართვის პანელი</h1>
        <button nz-button nzDanger (click)="logout()">გასვლა</button>
      </div>

      <nz-select [(ngModel)]="filter" class="w-48 mb-4">
        <nz-option nzValue="All" nzLabel="სტატუსი"></nz-option>
        <nz-option nzValue="Active" nzLabel="აქტიური"></nz-option>
        <nz-option nzValue="Inactive" nzLabel="არააქტიური"></nz-option>
      </nz-select>

      <nz-table #t [nzData]="rows" [nzShowPagination]="false">
        <thead>
          <tr><th>სახელი</th><th>როლი</th><th>სტატუსი</th></tr>
        </thead>
        <tbody>
          @for (row of t.data; track row.id) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.role }}</td>
              <td>{{ row.status === 'Active' ? 'აქტიური ✔' : 'არააქტიური ❌' }}</td>
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

  filter = 'All';

  users = [
  { id: 1, name: 'კახა',     role: 'ადმინისტრატორი', status: 'Active' },
  { id: 2, name: 'Helpdesk', role: 'საპორტი',        status: 'Inactive' },
  { id: 3, name: 'საბა',     role: 'სტუმარი',        status: 'Active' },
  { id: 4, name: 'SysAdmin', role: 'ადმინისტრატორი', status: 'Active' },
  { id: 5, name: 'მარიამი',  role: 'სტუმარი',        status: 'Inactive' },
];

  get rows() {
    return this.filter === 'All' ? this.users : this.users.filter(u => u.status === this.filter);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}