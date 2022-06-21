import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<never>, next: HttpHandler): Observable<HttpEvent<void>> {
    this.loaderService.isLoading$.next(true);

    return next.handle(req).pipe(
      finalize((): void => {
        this.loaderService.isLoading$.next(false);
      }),
    );
  }
}

export const LOADER_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: LoaderInterceptor,
};
