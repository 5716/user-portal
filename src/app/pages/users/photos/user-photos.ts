import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-user-photos',
  imports: [RouterLink, NzIconModule],
  template: `
    <div class="max-w-3xl mx-auto p-8">
      <a routerLink="/users" class="text-blue-600 text-sm flex items-center gap-1">
        <nz-icon nzType="arrow-left" nzTheme="outline" />
        <span>უკან დაბრუნება</span>
      </a>

      @if (userResource.value(); as user) {
        <h1 class="text-2xl font-semibold mt-4 mb-2">{{ user.name }}</h1>
        <p class="text-gray-500 mb-6">{{ user.email }} · {{ user.company?.name }}</p>
      }

      <!-- <div class="grid grid-cols-3 gap-4">
        @for (photo of photosResource.value().slice(0, 12); track photo.id) {
          <img
            [src]="photo.thumbnailUrl"
            [alt]="photo.title"
            class="rounded-lg w-full"
          />
        }
      </div> -->


        @for (post of postsResource.value().slice(0, 12); track post.id) {
          <h2 class="text-lg font-semibold mt-4">{{ post.title }}</h2>
          <p class="text-gray-700 mb-4">{{ post.body }}</p>
        }

    </div>
  `,
})
export class UserPhotos {

  id = input<number>();

  userResource = httpResource<PlaceholderUser>(() => ({
    url: `https://jsonplaceholder.typicode.com/users/${this.id()}`,
  }));

  // photosResource = httpResource<PlaceholderPhoto[]>(
  //   () => ({ url: `https://jsonplaceholder.typicode.com/photos?albumId=${this.id()}` }),
  //   { defaultValue: [] },
  // );

  postsResource = httpResource<Post[]>(
    () => ({ url: `https://jsonplaceholder.typicode.com/posts?userId=${this.id()}` }),
    { defaultValue: [] },
  );

}
