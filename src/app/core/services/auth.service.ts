import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AuthDataService } from 'src/app/data/service/auth-data.service';
import { AuthDataUser, FirebaseAuthResponse } from 'src/app/data/schema/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get token() {
    return Cookie.get('token');
  }

  constructor(private authDataService: AuthDataService) {}

  register(user: AuthDataUser): Observable<any> {
    return this.authDataService.register(user).pipe(tap(this.setToken));
  }

  login(user: AuthDataUser): Observable<any> {
    return this.authDataService.login(user).pipe(tap(this.setToken));
  }

  logout() {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      const { idToken } = response;
      Cookie.set('token', idToken, 1);
    } else {
      Cookie.delete('token');
    }
  }
}
