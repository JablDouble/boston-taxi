import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from 'src/app/core/services/map.service';
import { TripService } from 'src/app/core/services/trip.service';
import { Address, Coordinate, PaymentMethod } from 'src/app/shared/types';

@Component({
  selector: 'app-order-taxi-form',
  templateUrl: './order-taxi-form.component.html',
  styleUrls: ['./order-taxi-form.component.scss'],
})
export class OrderTaxiFormComponent {
  orderTaxiForm = new FormGroup({
    pickupAddress: new FormControl(null, [Validators.required]),
    arrivalAddress: new FormControl(null, [Validators.required]),
    tariff: new FormControl(null, [Validators.required]),
    paymentMethod: new FormControl(PaymentMethod.Cash, [Validators.required]),
  });

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
    if (this.orderTaxiForm.value && this.orderTaxiForm.valid) {
      this.tripService.createNewTrip(this.orderTaxiForm.value);
    }
  }

  setPickupAddress(address: Address) {
    this.orderTaxiForm.get('pickupAddress')?.setValue(address);
    this.tripService.setPickupAddress(address); // to change pickup position on the map
  }

  setArrivalAddress(address: Address) {
    this.orderTaxiForm.get('arrivalAddress')?.setValue(address);
    this.tripService.setArrivalAddress(address); // to show destination between two addresses
  }

  onSetTariff(value: string) {
    this.orderTaxiForm.get('tariff')?.setValue(value);
  }
}
