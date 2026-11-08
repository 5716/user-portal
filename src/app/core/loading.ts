import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Loading {
  count = signal(0);
}

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(Loading);
  loading.count.update((n) => n + 1);
  return next(req).pipe(finalize(() => loading.count.update((n) => n - 1)));
};
