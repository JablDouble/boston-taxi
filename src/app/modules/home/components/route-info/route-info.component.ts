import { Component } from '@angular/core';
import { MapService } from 'src/app/core/services/map.service';
import { TripService } from 'src/app/core/services/trip.service';
import { Address, Coordinate } from 'src/app/shared/types';

@Component({
  selector: 'app-route-info',
  templateUrl: './route-info.component.html',
  styleUrls: ['./route-info.component.scss'],
})
export class RouteInfoComponent {
  constructor(private mapService: MapService, public tripService: TripService) {
    this.mapService.getPosition().subscribe((pos) => {
      const { latitude, longitude } = pos.coords;

      const currentCoordinate: Coordinate = {
        latitude,
        longitude,
      };

      this.mapService.getPositionByLocation(currentCoordinate).subscribe((address) => {
        if (address[0]) {
          this.setPickupAddress(address[0]);
        }
      }); // to get name of street by coordinates
    });
  }

  callTheTaxi() {
    this.tripService.createNewTrip();
  }

  setPickupAddress(address: Address) {
    this.tripService.setPickupAddress(address);
  }

  setArrivalAddress(address: Address) {
    this.tripService.setArrivalAddress(address);
  }
}
