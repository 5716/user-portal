import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  template: `
  <h1 class="text-2xl font-semibold">{{ user()?.name }}</h1>
  <p class="text-gray-500">{{ user()?.email }}</p>
  `,
  styleUrl: './user.css',
})
export class User {
  user = input<PlaceholderUser>();
}
