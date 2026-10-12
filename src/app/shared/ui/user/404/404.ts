import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-404',
  imports: [RouterLink, NzButtonModule, NzIconModule],
  templateUrl: './404.html',
})
export class Page404 {}