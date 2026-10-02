import { HttpClient, httpResource } from '@angular/common/http';
import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Auth } from '../../../auth';
import { AddEditDialog } from '../add-edit-dialog/add-edit-dialog';

@Component({
  imports: [NzTableModule, NzIconModule, NzButtonModule, NzModalModule, AddEditDialog],
  selector: 'app-list',
  templateUrl: './list.html',
})
export class List {
  private router = inject(Router);
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private message = inject(NzMessageService);

  dialog = viewChild(AddEditDialog);
  showModal = signal(false);
  saving = signal(false);

  placeholderUsersResource = httpResource<PlaceholderUser[]>(
    () => ({ url: `https://jsonplaceholder.typicode.com/users` }),
    { defaultValue: [] },
  );

  rows = computed(() => this.placeholderUsersResource.value());

  save() {
    const value = this.dialog()?.getValue();
    if (!value) return;

    this.saving.set(true);
    this.http.post('https://jsonplaceholder.typicode.com/users', value).subscribe({
      next: () => {
        const user: PlaceholderUser = {
          id: Math.max(0, ...this.rows().map((u) => u.id)) + 1,
          ...value,
          website: '',
          address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: 0, lng: 0 } },
          company: { name: '', catchPhrase: '', bs: '' },
        };
        this.placeholderUsersResource.value.update((list) => [...list, user]);
        this.dialog()?.form.reset();
        this.saving.set(false);
        this.showModal.set(false);
        this.message.success('მომხმარებელი დაემატა');
      },
      error: () => {
        this.saving.set(false);
        this.message.error('შეცდომა, სცადე თავიდან');
      },
    });
  }

  goTo(id: number) {
    this.router.navigate(['/users', id, 'photos']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
