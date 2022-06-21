import { Component } from '@angular/core';
import { TripService } from 'src/app/core/services/trip.service';
import { TaxiDriver } from 'src/app/data/schema/trip';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss'],
})
export class DriverInfoComponent {
  taxiDriver: TaxiDriver;

  constructor(public tripService: TripService) {
    this.taxiDriver = this.tripService?.taxi?.taxiDriver;
  }

  getVehicleInfoByTaxiDriver(taxiDriver: TaxiDriver): null | string {
    const { vehicle } = taxiDriver;

    let vehicleInfo: string[] = [];

    if (vehicle.brand) {
      vehicleInfo.push(vehicle.brand);
    }

    if (vehicle.model) {
      vehicleInfo.push(vehicle.model);
    }

    if (!vehicleInfo.length) {
      return null;
    }

    return vehicleInfo.join(' ');
  }
}
