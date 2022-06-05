import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PositionStackResponse } from '../schema/map';

@Injectable({
  providedIn: 'root',
})
export class MapDataService {
  constructor(private http: HttpClient) {}

  public getPositionByStreetName(streetName: string): Observable<PositionStackResponse> {
    return this.http.get<PositionStackResponse>(`${environment.POSTIONSTACK_API_URL}/forward`, {
      params: {
        access_key: environment.POSTIONSTACK_API_KEY,
        query: streetName,
      },
    });
  }

  public getPositionByLocation(lat: number, lng: number): Observable<PositionStackResponse> {
    return this.http.get<PositionStackResponse>(`${environment.POSTIONSTACK_API_URL}/reverse`, {
      params: {
        access_key: environment.POSTIONSTACK_API_KEY,
        query: `${lat}, ${lng}`,
      },
    });
  }
}
