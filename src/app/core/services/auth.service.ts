import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthDataService } from 'src/app/data/service/auth-data.service';
import { AuthDataUser, FirebaseAuthResponse } from 'src/app/data/schema/auth';
import { AuthStorageService } from 'src/app/shared/utils/auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get token() {
    return this.authStorageService.getAuthToken();
  }

  constructor(
    private authDataService: AuthDataService,
    public authStorageService: AuthStorageService,
  ) {}

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
      this.authStorageService.updateAuthToken(idToken);
    } else {
      this.authStorageService.deleteAuthToken();
    }
  }
}
