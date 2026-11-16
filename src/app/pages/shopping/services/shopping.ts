import { httpResource } from '@angular/common/http';
import { Service } from '@angular/core';

@Service({ autoProvided: false })
export class ShoppingService {
  private readonly productsResource = httpResource<Product[]>(
    () => 'https://fakestoreapi.com/products?limit=10',
    { defaultValue: [] },
  );

  readonly isLoading = this.productsResource.isLoading;
  readonly error = this.productsResource.error;
  readonly value = this.productsResource.value;

  reload() {
    this.productsResource.reload();
  }
}
