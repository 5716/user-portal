import { CurrencyPipe, DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { paymentIconPipe } from '../../shared/pipes/pipes';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-shopping',
  imports: [
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    CurrencyPipe,
    DatePipe,
    paymentIconPipe,
    NzIconModule,
  ],
  templateUrl: './shopping.html',
})
export class Shopping {
  private message = inject(NzMessageService);

  products = httpResource<Product[]>(() => 'https://fakestoreapi.com/products?limit=10', {
    defaultValue: [],
  });

  selected = signal<Product | null>(null);
  purchases = signal<Purchase[]>([]);
  paying = signal(false);
  method = signal('Apple Pay');

  total = computed(() => this.purchases().reduce((sum, p) => sum + p.price, 0));

  buy() {
    const product = this.selected();
    if (!product) return;

    this.paying.set(true);
    // setTimeout(() => {
    this.purchases.update((list) => [
      {
        id: list.length + 1,
        title: product.title,
        price: product.price,
        method: this.method(),
        date: new Date().toISOString(),
      },
      ...list,
    ]);
    this.paying.set(false);
    this.selected.set(null);
    this.message.success('გადახდა წარმატებით შესრულდა');
    // }, 1500);
  }
}
