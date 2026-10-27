import { DecimalPipe } from '@angular/common';
import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appSaba',
})
export class SabaPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (args.length === 0) return value;
    if (args[0] === 'rame') return `${value}${value}${value}${value}${value}${value}`;
    if (args[0] === 'rume') return `${value}-RUME`;
    return value;
  }
}

@Pipe({
  name: 'appPaymentIcon',
})
export class paymentIconPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'Apple Pay') return 'apple';
    if (value === 'Google Pay') return 'google';
    return 'credit-card';
  }
}

@Pipe({
  name: 'vPipe',
})
export class VPipe implements PipeTransform {
  transform(value: number, ...args: number[]): unknown {
    if (args.length === 0) return 'issues-close';
    return value > args[0] ? 'issues-close' : 'check-square';
  }
}

@Pipe({
  name: 'appTempColor',
})
export class TempColorPipe implements PipeTransform {
  transform(value: number, ...args: number[]): string {
    // console.log(value, args);
    return value > args[0] ? 'text-red-500' : 'text-blue-500';
  }
}

@Pipe({
  name: 'appMarketColor',
})
export class MarketColorPipe implements PipeTransform {
  transform(value: unknown): string {
    return Number(value) >= 0 ? 'text-green-500' : 'text-red-500';
  }
}

@Pipe({
  name: 'currency',
})
export class LariPipe extends DecimalPipe implements PipeTransform {
  override transform(
    value: number | string | null | undefined,
    currency: string,
    digitsInfo?: string,
    locale?: string,
  ): string | null;
  override transform(value: null | undefined, currency: string, digitsInfo?: string, locale?: string): null;
  override transform(
    value: number | string | null | undefined,
    currency: string,
    digitsInfo?: string,
    locale?: string,
  ): string | null {
    const currencySymbol = currency === 'gel' ? '₾' : currency === 'eur' ? '€' : currency === 'usd' ? '$' : currency;

    switch (typeof value) {
      case 'number':
        return value ? `${super.transform(value, '1.0-2', locale)} ${currencySymbol}` : null;
      case 'string':
        return +value ? `${super.transform(+value, '1.0-2', locale)} ${currencySymbol}` : null;
      default:
        return '--';
    }
  }
}
