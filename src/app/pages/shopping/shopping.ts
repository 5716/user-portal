import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BtcPipe, LariPipe, paymentIconPipe } from '../../shared/pipes/pipes';
import { CryptoService } from '../market/services/crypto';
import { ShoppingService } from './services/shopping';

@Component({
  selector: 'app-shopping',
  imports: [
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    DatePipe,
    paymentIconPipe,
    NzIconModule,
    LariPipe,
    NzSkeletonModule,
    BtcPipe,
  ],
  templateUrl: './shopping.html',
})
export class Shopping {
  private message = inject(NzMessageService);

  cryptoService = inject(CryptoService);
  shoppingService = inject(ShoppingService);

  selected = signal<Product | null>(null);
  purchases = signal<Purchase[]>([]);
  paying = signal(false);
  method = signal('Apple Pay');

  total = computed(() => this.purchases().reduce((sum, p) => sum + p.price, 0));

  reload() {
    this.shoppingService.reload();
  }

  buy() {
    const product = this.selected();
    if (!product) return;

    this.paying.set(true);
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
  }
}
