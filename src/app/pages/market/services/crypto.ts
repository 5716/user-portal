import { httpResource } from '@angular/common/http';
import { Service } from '@angular/core';

@Service({ autoProvided: false })
export class CryptoService {

  private readonly cryptoResource = httpResource<Record<string, unknown>[]>(
    () => 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10',
    { defaultValue: [] },
  );

  readonly isLoading = this.cryptoResource.isLoading;
  readonly status = this.cryptoResource.status;
  readonly error = this.cryptoResource.error;
  readonly value = this.cryptoResource.value;

  reload() {
    this.cryptoResource.reload();
  }


}
