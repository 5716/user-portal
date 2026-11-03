import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError, timeout } from 'rxjs';

interface HttpError {
  status: number;
  error?: unknown;
  message?: string;
  name?: string;
}

/**
 * Error Handling Interceptor
 * Handles timeouts, network errors, and HTTP error responses with user notifications
 */
export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {

  const messageService = inject(NzMessageService);

  // Determine timeout based on URL
  const TIMEOUT = 2000; // 2 წამი
  const NO_INTERNET_MESSAGE = 'კავშირის შეცდომა';

  // Check for internet connectivity
  if (!navigator.onLine) {
    messageService.create('error', NO_INTERNET_MESSAGE);
    return throwError(() => new Error('NO INTERNET'));
  }

  return next(req).pipe(
    timeout(TIMEOUT),
    catchError((error: HttpError) => {
      // Handle timeout errors
      if (error.name === 'TimeoutError') {
        const seconds = TIMEOUT / 1000;
        messageService.create('error', `მოთხოვნა შეწყვეტილია ${seconds} წამის გასვლის შემდეგ`);
        return throwError(() => error);
      }

      // Skip notification for 401 errors (handled by auth interceptor)
      if (error.status !== 401) {
        handleErrorNotification(error, messageService);
      }

      return throwError(() => error);
    }),
  );
};


const handleErrorNotification = (error: HttpError, messageService: NzMessageService): void => {
  // // Handle network errors
  if (!error.status || error.status === 0) {
    messageService.create('error', 'ქსელის შეცდომა - სერვერთან დაკავშირება ვერ მოხერხდა');
    return;
  }

  // Handle 429 error
  if (error.status === 429) {
    messageService.create('error', errorText(error.status));
    return;
  }

  // Handle client errors (4xx)
  if (error.status >= 400 && error.status < 500) {
    handleClientError(error, messageService);
    return;
  }

  // Handle server errors (5xx)
  if (error.status >= 500) {
    messageService.create('error', `სერვერის შეცდომა (${error.status}) - გთხოვთ სცადოთ მოგვიანებით`);
    return;
  }

  messageService.create('error', 'უცნობი შეცდომა...');
};

const handleClientError = (error: HttpError, messageService: NzMessageService): void => {

  console.log('Client error:', error);
  return;

};

function errorText(status: number) {
  if (status === 400) return 'არასწორი მოთხოვნა';
  if (status === 401) return 'გაიარე ავტორიზაცია';
  if (status === 403) return 'წვდომა აკრძალულია';
  if (status === 404) return 'მონაცემები ვერ მოიძებნა';
  if (status === 408) return 'მოთხოვნას ძალიან დიდი დრო დასჭირდა';
  if (status === 429) return 'ძალიან ბევრი მოთხოვნაა, სცადე ცოტახანში';
  if (status >= 500) return 'სერვერის შეცდომა, სცადე მოგვიანებით';
  return 'შეცდომა, სცადე თავიდან';
}
