import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { map, Observable } from 'rxjs';
import { Profile } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUserBySessionToken(): Observable<Profile> {
    return this.http
      .post<any>(
        `${environment.GOOGLE_API_URL}/accounts:lookup`,
        {
          idToken: Cookie.get('token'),
        },
        {
          params: {
            key: environment.FIREBASE_API_KEY,
          },
        },
      )
      .pipe(map((data) => data.users[0]));
  }
}