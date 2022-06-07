import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Trip, TripResponse } from 'src/app/data/schema/trip';
import { TripDataService } from 'src/app/data/service/trip-data.service';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private tripDataService: TripDataService) {}

  createNewTrip(trip: Trip): Observable<string> {
    return this.tripDataService.createNewTrip(trip);
  }

  getAllTrips(): Observable<Trip[]> {
    return this.tripDataService.getAllTrips().pipe(
      map((response: TripResponse) => {
        return Object.keys(response).map((key: string) => ({
          ...response[key],
          id: key,
        }));
      }),
    );
  }
}