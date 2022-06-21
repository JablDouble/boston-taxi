import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Path } from 'src/app/data/schema/map';
import { MapDataService } from 'src/app/data/service/map-data.service';
import { Address, Coordinate } from 'src/app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  path: Path = {
    start: null,
    end: null,
  };

  constructor(private mapDataService: MapDataService) {}

  public getPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
        observer.next(pos);
      });
    });
  }

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

  public setStartPointOfPath(address: Address) {
    this.path.start = address;
  }

  public setEndPointOfPath(address: Address) {
    this.path.end = address;
  }
}
