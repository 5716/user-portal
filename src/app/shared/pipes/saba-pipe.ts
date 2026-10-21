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
  transform(value: unknown, ...args: unknown[]): unknown {
    return value
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
