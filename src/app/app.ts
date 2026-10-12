import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './auth';
import { Header } from './pages/components/header/header';
import { Menu } from './pages/components/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('user-portal');
  protected auth = inject(Auth);
}
