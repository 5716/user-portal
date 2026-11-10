import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlingInterceptor } from './core/interceptors/error-handler';
import { loadingInterceptor } from './core/interceptors/loading-spinner';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideNzDateFnsAdapter(),
    provideHttpClient(withInterceptors([loadingInterceptor, errorHandlingInterceptor])),
    provideRouter([], withComponentInputBinding(), withViewTransitions()),
  ],
};
