import { httpResource } from '@angular/common/http';
import { Component, computed, input, signal } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-photos',
  imports: [NzModalModule],
  templateUrl: './user-photos.html',
})
export class UserPhotos {
  id = input<number>();
  selected = signal<PlaceholderPhoto | null>(null);
  modalTitle = computed(() => this.selected()?.title ?? '');

  userResource = httpResource<PlaceholderUser>(() => ({
    url: `https://jsonplaceholder.typicode.com/users/${this.id()}`,
  }));

  photosResource = httpResource<PlaceholderPhoto[]>(
    () => ({
      url: `https://jsonplaceholder.typicode.com/photos?albumId=${this.id()}`,
    }),
    { defaultValue: [] },
  );
}
