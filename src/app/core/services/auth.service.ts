import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthDataService } from 'src/app/data/service/auth-data.service';
import { AuthDataUser, FirebaseAuthResponse } from 'src/app/data/schema/auth';
import { CookieService } from 'src/app/data/service/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get token() {
    return this.cookieService.get('token');
  }

  constructor(private authDataService: AuthDataService, public cookieService: CookieService) {}

  register(user: AuthDataUser): Observable<FirebaseAuthResponse | null> {
    return this.authDataService.register(user).pipe(tap(this.setToken.bind(this)));
  }

  login(user: AuthDataUser): Observable<FirebaseAuthResponse | null> {
    return this.authDataService.login(user).pipe(tap(this.setToken.bind(this)));
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
      this.cookieService.set('token', idToken, 1);
    } else {
      this.cookieService.delete('token');
    }
  }
}
