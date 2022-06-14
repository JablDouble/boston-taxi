import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MapDataService } from 'src/app/data/service/map-data.service';
import { Address, Coordinate } from 'src/app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private mapDataService: MapDataService) {}

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

  public getPositionByLocation(coordinate: Coordinate): Observable<Address[]> {
    return this.mapDataService
      .getPositionByLocation(coordinate)
      .pipe(map((response) => response.data));
  }
}
