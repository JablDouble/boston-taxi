import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { MapDataService } from 'src/app/data/service/map-data.service';
import { Address } from 'src/app/shared/interfaces';

@Injectable()
export class MapService {
  pickupAddress$: BehaviorSubject<Address | null> = new BehaviorSubject<Address | null>(null);

  arrivalAddress$: BehaviorSubject<Address | null> = new BehaviorSubject<Address | null>(null);

  constructor(private mapDataService: MapDataService) {}

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

  public getHomePosition() {}

  public getPositionByStreetName(streetName: string): Observable<Address[]> {
    return this.mapDataService
      .getPositionByStreetName(streetName)
      .pipe(map((response) => response.data));
  }

  public getPositionByLocation(lat: number, lng: number): Observable<Address[]> {
    return this.mapDataService
      .getPositionByLocation(lat, lng)
      .pipe(map((response) => response.data));
  }
}
