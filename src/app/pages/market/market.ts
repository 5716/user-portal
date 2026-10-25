import { httpResource } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MarketColorPipe } from '../../shared/pipes/pipes';

@Component({
  selector: 'app-market',
  imports: [NzTableModule, NzButtonModule, NzIconModule, MarketColorPipe],
  templateUrl: './market.html',
})
export class Market {
  title = 'კრიპტო ბაზარი';

  columns = [
    { key: 'market_cap_rank', label: '#' },
    { key: 'name', label: 'სახელი' },
    { key: 'current_price', label: 'ფასი ($)' },
    { key: 'price_change_percentage_24h', label: '24სთ (%)' },
  ];

  resource = httpResource<Record<string, unknown>[]>(
    () => 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10',
    { defaultValue: [] },
  );

  constructor() {
    const timer = setInterval(() => this.resource.reload(), 15000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  reload() {
    this.resource.reload();
  }
}
