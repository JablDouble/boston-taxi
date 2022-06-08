import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthDataService } from 'src/app/data/service/auth-data.service';
import { Profile } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private authDataService: AuthDataService) {}

  getProfile(): Observable<Profile> {
    return this.authDataService.getProfile().pipe(map((data) => data.users[0]));
  }
}
