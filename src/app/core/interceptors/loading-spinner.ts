import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingSpinner {
  count = signal(0);
}

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingSpinner = inject(LoadingSpinner);
  loadingSpinner.count.update((n) => n + 1);
  return next(req).pipe(finalize(() => loadingSpinner.count.update((n) => n - 1)));
};
