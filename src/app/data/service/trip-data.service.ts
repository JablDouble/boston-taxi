import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/modules/dashboard/interfaces';
import { environment } from 'src/environments/environment';
import { TripResponse } from '../schema/trip';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  constructor(private http: HttpClient) {}

  createNewTrip(trip: Trip): Observable<string> {
    return this.http.post<string>(`${environment.FIREBASE_API_URL}/trips.json`, trip);
  }

  getAllTrips(): Observable<TripResponse> {
    return this.http.get<TripResponse>(`${environment.FIREBASE_API_URL}/trips.json`);
  }
}
