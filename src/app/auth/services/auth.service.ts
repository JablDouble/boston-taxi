import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FirebaseAuthResponse, AuthDataUser } from "src/app/auth/interfaces";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ProfileService } from "src/app/common/services/profile.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error$: Subject<string> = new Subject<string>();

  get token() {
    return Cookie.get('token');
  }

  constructor(private http: HttpClient, private profileService: ProfileService) {
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
        catchError(error => this.handleError(error))
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
        catchError(error => this.handleError(error))
      );
  };

  logout() {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  handleError(error: HttpErrorResponse) {
    console.error(error);
    const { message } = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('User was not found');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      default:
        this.error$.next('Something went wrong');
        break;
    }

    return throwError(() => new Error(message));
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