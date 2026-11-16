import { httpResource } from '@angular/common/http';
import { computed, Service } from '@angular/core';

@Service({ autoProvided: false })
export class CryptoService {
  private readonly cryptoResource = httpResource<Record<string, unknown>[]>(
    () => 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10',
    { defaultValue: [] },
  );

  private readonly btcResource = httpResource<{ bitcoin: { gel: number } }>(
    () => 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=gel',
  );

  readonly isLoading = this.cryptoResource.isLoading;
  readonly status = this.cryptoResource.status;
  readonly error = this.cryptoResource.error;
  readonly value = this.cryptoResource.value;

  readonly btcPrice = computed(() => this.btcResource.value()?.bitcoin.gel);

  reload() {
    this.cryptoResource.reload();
  }
}
