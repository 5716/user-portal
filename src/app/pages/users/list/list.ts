import { HttpClient, httpResource } from '@angular/common/http';
import { Component, computed, inject, linkedSignal, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AddEditDialog } from '../add-edit-dialog/add-edit-dialog';
import { Menu } from '../../components/menu/menu';

const API = 'https://jsonplaceholder.typicode.com/users';

@Component({
  imports: [NzTableModule, NzIconModule, NzButtonModule, NzModalModule, AddEditDialog, Menu],
  selector: 'app-list',
  templateUrl: './list.html',
})
export class List {
  private router = inject(Router);
  private http = inject(HttpClient);
  private message = inject(NzMessageService);

  dialog = viewChild(AddEditDialog);
  showModal = signal(false);
  saving = signal(false);
  editing = signal<PlaceholderUser | null>(null);
  modalTitle = computed(() => (this.editing() ? 'რედაქტირება' : 'ახალი მომხმარებელი'));

  placeholderUsersResource = httpResource<PlaceholderUser[]>(() => ({ url: API }), {
    defaultValue: [],
  });

  users = linkedSignal(() => this.placeholderUsersResource.value());

  openAdd() {
    this.editing.set(null);
    this.showModal.set(true);
  }

  openEdit(user: PlaceholderUser) {
    this.editing.set(user);
    this.showModal.set(true);
  }

  close() {
    this.showModal.set(false);
    this.editing.set(null);
  }

  save() {
    const value = this.dialog()?.getValue();
    if (!value) return;

    const current = this.editing();
    const updated: PlaceholderUser | null = current
      ? { ...current, ...value, phone: value.phone || current.phone }
      : null;

    const request: Observable<unknown> = current
      ? current.id <= 10
        ? this.http.put(`${API}/${current.id}`, updated)
        : of(updated)
      : this.http.post(API, value);

    this.saving.set(true);
    request.subscribe({
      next: (response) => {
        // const user: PlaceholderUser = {
        //   id: Math.max(0, ...this.users().map((u) => u.id)) + 1,
        //   ...value,
        //   website: '',
        //   address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: 0, lng: 0 } },
        //   company: { name: '', catchPhrase: '', bs: '' },
        // };
        // force add the new user to the list
        if (updated) {
          this.users.update((list) => list.map((u) => (u.id === updated.id ? updated : u)));
        } else {
          this.users.update((list) => [...list, response as PlaceholderUser]);
        }
        // წესით, აქ უნდა განახლდეს სერვერის მონაცემები, მაგრამ ჩვენ უბრალოდ ადგილობრივ სიას ვაახლებთ.
        // reloadUsers()

        this.saving.set(false);
        this.close();
        this.message.success(current ? 'მომხმარებელი განახლდა' : 'მომხმარებელი დაემატა');
      },
      error: () => {
        this.saving.set(false);
        this.message.error('შეცდომა, სცადე თავიდან');
      },
      complete: () => {
        this.message.info('მოვრჩი!');
      },
    });
  }

  reloadUsers() {
    this.placeholderUsersResource.reload();
  }

  goTo(id: number) {
    this.router.navigate(['/users', id, 'photos']);
  }
}
