import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Address } from 'src/app/common/interfaces';
import { PositionStackResponse } from 'src/app/dashboard/interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class MapService {

  pickupAddress$: BehaviorSubject<Address | null> = new BehaviorSubject<Address | null>(null);
  arrivalAddress$: BehaviorSubject<Address | null> = new BehaviorSubject<Address | null>(null);

  constructor(private http: HttpClient) { }


  public setPickupAddress(address: Address) {
    this.pickupAddress$.next(address);
  }

  public setArrivalAddress(address: Address) {
    this.arrivalAddress$.next(address);
  }

  public getPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
        observer.next(pos);
      });
    });
  }

  public getHomePosition() {
    //   navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
    //     observer.next(pos);
    // });
  }

  public getPositionByStreetName(streetName: string): Observable<Address[]> {
    return this.http.get<PositionStackResponse>(`http://api.positionstack.com/v1/forward`, {
      params: {
        access_key: environment.POSTIONSTACK_API_KEY,
        query: streetName
      }
    }).pipe(
      map(response => response.data)
    )
  }

  public getPositionByLocation(lat: number, lng: number): Observable<Address[]> {
    return this.http.get<PositionStackResponse>(`http://api.positionstack.com/v1/reverse`, {
      params: {
        access_key: environment.POSTIONSTACK_API_KEY,
        query: `${lat}, ${lng}`
      }
    }).pipe(
      map(response => response.data)
    )
  }
}
