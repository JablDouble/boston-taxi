import { Component, Input } from '@angular/core';
import { Trip, TripStatus } from 'src/app/data/schema/trip';
import * as converter from 'number-to-words';
import { getVehicleInfoByTaxiDriver } from '../../../utils/trip.util';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @Input() trip: Trip;

  @Input() index: number;

  public converter = converter;

  public getVehicleInfoByTaxiDriver = getVehicleInfoByTaxiDriver;

  constructor() {}

  getTripStatusMessage(status: TripStatus) {
    switch (status) {
      case TripStatus.Search:
        return 'Looking for the best variant...';
      case TripStatus.Accepted:
        return 'Driver are already going to you';
      case TripStatus.Waiting:
        return 'The driver is waiting for you...';
      case TripStatus.Start:
        return 'The driver started the trip';
      case TripStatus.Start:
        return 'The driver finished the trip';
    }
  }
}
