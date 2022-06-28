import { Component } from '@angular/core';
import { TripService } from 'src/app/core/services/trip.service';
import { TaxiDriver } from 'src/app/data/schema/trip';
import { getVehicleInfoByTaxiDriver } from '../../utils/trip.util';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss'],
})
export class DriverInfoComponent {
  taxiDriver: TaxiDriver;

  public getVehicleInfoByTaxiDriver = getVehicleInfoByTaxiDriver;

  constructor(public tripService: TripService) {
    this.taxiDriver = this.tripService?.taxi?.taxiDriver;
  }
}
