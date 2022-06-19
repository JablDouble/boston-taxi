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
}
