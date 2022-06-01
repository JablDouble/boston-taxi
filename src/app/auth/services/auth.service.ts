import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FirebaseAuthResponse, AuthDataUser } from "src/app/auth/interfaces";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token() {
    return Cookie.get('token');
  }

  constructor(private http: HttpClient) {
  }

  register(user: AuthDataUser): Observable<any> {
    return this.http.post<FirebaseAuthResponse>(`${environment.GOOGLE_API_URL}/accounts:signUp`, {
      ...user,
      returnSecureToken: true
    }, {
      params: {
        key: environment.FIREBASE_API_KEY
      }
    })
      .pipe(
        tap(this.setToken),
      );
  };

  login(user: AuthDataUser): Observable<any> {
    return this.http.post<FirebaseAuthResponse>(`${environment.GOOGLE_API_URL}/accounts:signInWithPassword`, {
      ...user,
      returnSecureToken: true
    }, {
      params: {
        key: environment.FIREBASE_API_KEY
      }
    })
      .pipe(
        tap(this.setToken),
      );
  };

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