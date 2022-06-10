import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone, Provider } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { SERVER_ERRORS } from './errors';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private notificationService: NotificationService, private ngZone: NgZone) {}

  handleError(error: any) {
    console.error(error);

    if (!(error instanceof HttpErrorResponse)) {
      error = error?.rejection || error;
    } else {
      error = error?.error?.error || error;
    }

    error = error?.message || error;
    const errorMessage = SERVER_ERRORS[error] || error || 'Something went wrong. Undefined error';

    this.ngZone.run(() => {
      this.notificationService.error(errorMessage);
    });
  }
}

export const GLOBAL_ERROR_HANDLER_PROVIDER: Provider = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandler,
};
