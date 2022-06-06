import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthDataUser, FirebaseAuthResponse } from '../schema/auth';

const initialParams = {
  key: environment.FIREBASE_API_KEY,
};

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(private http: HttpClient) {}

  register(user: AuthDataUser): Observable<FirebaseAuthResponse> {
    return this.http.post<FirebaseAuthResponse>(
      `${environment.GOOGLE_API_URL}/accounts:signUp`,
      {
        ...user,
        returnSecureToken: true,
      },
      {
        params: {
          ...initialParams,
        },
      },
    );
  }

  login(user: AuthDataUser): Observable<any> {
    return this.http.post<FirebaseAuthResponse>(
      `${environment.GOOGLE_API_URL}/accounts:signInWithPassword`,
      {
        ...user,
        returnSecureToken: true,
      },
      {
        params: {
          ...initialParams,
        },
      },
    );
  }
}
