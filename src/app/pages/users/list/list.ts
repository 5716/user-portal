import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderComponent, NzPageHeaderExtraDirective } from 'ng-zorro-antd/page-header';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { VPipe } from '../../../shared/pipes/pipes';
import { AddEditDialog } from '../add-edit-dialog/add-edit-dialog';
import { UsersService } from '../services/users';

@Component({
  imports: [
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    AddEditDialog,
    NzPageHeaderComponent,
    NzPageHeaderExtraDirective,
    VPipe,
    NzSkeletonModule,
  ],
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
})
export class List {
  private router = inject(Router);
  private message = inject(NzMessageService);

  usersService = inject(UsersService);

  dialog = viewChild(AddEditDialog);
  showModal = signal(false);
  saving = signal(false);
  editing = signal<PlaceholderUser | null>(null);
  modalTitle = computed(() => (this.editing() ? 'რედაქტირება' : 'ახალი მომხმარებელი'));

  status = computed(() => Math.floor(Math.random() * this.usersService.users().length));

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
    const request = current ? this.usersService.edit(current, value) : this.usersService.add(value);

    this.saving.set(true);
    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.close();
        this.message.success(current ? 'მომხმარებელი განახლდა' : 'მომხმარებელი დაემატა');
      },
      error: () => {
        this.saving.set(false);
        this.message.error('შეცდომა, სცადე თავიდან');
      },
    });
  }

  reloadUsers() {
    this.usersService.reload();
  }

  goTo(id: number) {
    this.router.navigate(['/users', id, 'photos']);
  }
}
