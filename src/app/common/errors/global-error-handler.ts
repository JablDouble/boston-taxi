import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, NgZone, Provider } from "@angular/core";
import { NotificationService } from "../services/notification.service";
import { SERVER_ERRORS } from "./errors";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private notificationService: NotificationService,
    private ngZone: NgZone
  ) { }

  handleError(error: any) {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection;
    } else {
      error = error.error.error;
    }

    const errorMessage = error?.message || error;

    this.ngZone.run(() => {
      this.notificationService.error(
        SERVER_ERRORS[errorMessage] || errorMessage || 'Something went wrong. Undefined error'
      )
    });
  }
}

export const GLOBAL_ERROR_HANDLER_PROVIDER: Provider = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandler
}