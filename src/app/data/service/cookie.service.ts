import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  get(field: string) {
    return Cookie.get(field);
  }

  delete(field: string) {
    Cookie.delete(field);
  }

  set(field: string, value: string, expires?: number | undefined) {
    Cookie.set(field, value, expires);
  }
}
