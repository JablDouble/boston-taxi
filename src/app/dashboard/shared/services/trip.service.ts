import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Trip } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class TripService {

  constructor(private http: HttpClient) { }

  createNewTrip(trip: Trip): Observable<string> {
    return this.http.post<string>(`${environment.FIREBASE_API_URL}/trips.json`, trip);
  }

  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.FIREBASE_API_URL}/trips.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key: string) => ({
          ...response[key],
          id: key
        }));
      })
    );;
  }
}
