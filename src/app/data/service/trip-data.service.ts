import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatAll, first, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaxiDriver, Trip, TripResponse } from '../schema/trip';

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

  findTaxiDriver(): Observable<TaxiDriver> {
    return this.http
      .get<TaxiDriver[]>(`${environment.JSON_PLACEHOLDER_API_URL}/users`, {
        params: {
          _limit: 1,
        },
      })
      .pipe(
        concatAll(),
        first(),
        map((item) => ({
          ...item,
          phone: item.phone.slice(0, -7), // fix phone number
          vehicle: {
            brand: 'Chevrolet',
            model: 'Cruze',
            plateNumber: '7139PI-7',
          }, // mock vehicle data
        })),
      );
  }
}
