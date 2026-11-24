import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('user_portal_token');

  if (token && req.url.startsWith(environment.apiUrl)) {
    return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
  }
  return next(req);
};
