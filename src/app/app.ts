import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Auth } from './auth';
import { Loading } from './core/loading';
import { Header } from './pages/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, NzSpinModule, NzIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('user-portal');
  protected auth = inject(Auth);
  protected loading = inject(Loading);
}
