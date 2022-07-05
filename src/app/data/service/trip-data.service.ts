import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatAll, first, map, Observable } from 'rxjs';
import { Coordinate } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';
import { TaxiDriver, Trip, TripResponse, TripStatus } from '../schema/trip';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  constructor(private http: HttpClient) {}

  createNewTrip(trip: Trip): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(`${environment.FIREBASE_API_URL}/trips.json`, trip);
  }

  getAllTrips(): Observable<Trip[]> {
    return this.http
      .get<TripResponse>(`${environment.FIREBASE_API_URL}/trips.json`)
      .pipe(
        map((tripsResponse) =>
          tripsResponse
            ? Object.keys(tripsResponse).map((key) => ({ ...tripsResponse[key], id: key }))
            : [],
        ),
      );
  }

  getAllActiveTrips(): Observable<Trip[]> {
    return this.getAllTrips().pipe(
      map((trips: Trip[]) => trips.filter((trip) => trip.status !== TripStatus.Completion)),
    );
  }

  updateStatusOfTrip(tripId: string, status: TripStatus): Observable<TripResponse> {
    return this.http.patch<TripResponse>(`${environment.FIREBASE_API_URL}/trips/${tripId}.json`, {
      status,
    });
  }

  updateTaxiDriverOfTrip(
    tripId: string,
    taxiDriver: TaxiDriver,
    taxiPosition: Coordinate,
  ): Observable<TripResponse> {
    return this.http.patch<TripResponse>(`${environment.FIREBASE_API_URL}/trips/${tripId}.json`, {
      status: TripStatus.Accepted,
      taxiDriver,
      taxiPosition,
    });
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
            plateNumber: `${Math.floor(Math.random() * 8999) + 1000}PI-7`,
          }, // mock vehicle data
        })),
      );
  }
}
