import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MarketColorPipe } from '../../shared/pipes/pipes';
import { CryptoService } from './services/crypto';

@Component({
  selector: 'app-market',
  imports: [NzTableModule, NzButtonModule, NzIconModule, MarketColorPipe, NzSkeletonModule],
  templateUrl: './market.html',
})
export class Market implements OnInit, OnDestroy {

  cryptoService = inject(CryptoService);

  title = 'კრიპტო ბაზარი';

  columns = [
    { key: 'market_cap_rank', label: '#' },
    { key: 'name', label: 'სახელი' },
    { key: 'current_price', label: 'ფასი' },
    { key: 'price_change_percentage_24h', label: '24სთ (%)' },
  ];

  timer = setInterval(() => this.cryptoService.reload(), 15000);

  constructor() {
    console.log('Market component constructed');
    // const timer = setInterval(() => this.resource.reload(), 15000);
    // inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  reload() {
    this.cryptoService.reload();
  }

  ngOnInit(): void {
    console.log('Market component initialized');
  }

  ngOnDestroy(): void {
    console.log('Market component destroyed');
    clearInterval(this.timer);
  }
}
