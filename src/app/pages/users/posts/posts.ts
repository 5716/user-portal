import { httpResource } from '@angular/common/http';
import { Component, computed, input, signal } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { User } from '../../../shared/ui/user/user';

@Component({
  selector: 'app-posts',
  imports: [NzModalModule, User],
  templateUrl: './posts.html',
})
export class Posts {
  id = input<number>();
  selected = signal<PlaceholderPost | null>(null);
  modalTitle = computed(() => this.selected()?.title ?? '');

  userResource = httpResource<PlaceholderUser>(() => ({
    url: `https://jsonplaceholder.typicode.com/users/${this.id()}`,
  }));

  postsResource = httpResource<PlaceholderPost[]>(
    () => ({
      url: `https://jsonplaceholder.typicode.com/posts?userId=${this.id()}`,
    }),
    { defaultValue: [] },
  );
}
