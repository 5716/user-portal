import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  host: { class: 'block mb-8' },
  template: `
    <h1 class="text-2xl font-semibold">{{ user()?.name }}</h1>
    <p class="text-gray-500">{{ user()?.email }}</p>
  `,
})
export class User {
  user = input<PlaceholderUser>();
}
