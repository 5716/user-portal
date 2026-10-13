import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-menu',
  imports: [NzButtonModule, RouterLink, NzIconModule],
  templateUrl: './menu.html',
  styles: [`
    .hide-on-mobile-show-on-big-screen {

    }
    `]
})
export class Menu { }
