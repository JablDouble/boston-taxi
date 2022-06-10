import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

const authTokenName = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  constructor() {}

  getAuthToken() {
    return Cookie.get(authTokenName);
  }

  deleteAuthToken() {
    Cookie.delete(authTokenName);
  }

  updateAuthToken(value: string) {
    Cookie.set(authTokenName, value, 1);
  }
}
