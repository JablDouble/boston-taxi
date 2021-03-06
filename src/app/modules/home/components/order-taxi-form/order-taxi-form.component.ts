import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MapService } from 'src/app/core/services/map.service';
import { TripService } from 'src/app/core/services/trip.service';
import { Address, Coordinate, PaymentMethod } from 'src/app/shared/types';

@Component({
  selector: 'app-order-taxi-form',
  templateUrl: './order-taxi-form.component.html',
  styleUrls: ['./order-taxi-form.component.scss'],
})
export class OrderTaxiFormComponent implements OnDestroy {
  orderTaxiForm = new FormGroup({
    pickupAddress: new FormControl(null, [Validators.required]),
    arrivalAddress: new FormControl(null, [Validators.required]),
    tariff: new FormControl(null, [Validators.required]),
    paymentMethod: new FormControl(PaymentMethod.Cash, [Validators.required]),
  });

  private readonly destroyAddress$ = new Subject();

  constructor(private mapService: MapService, public tripService: TripService) {
    this.generateInitialAddress();

    this.orderTaxiForm.controls['pickupAddress'].valueChanges
      .pipe(takeUntil(this.destroyAddress$))
      .subscribe((pickupAddress: Address) => {
        this.mapService.setStartPointOfPath(pickupAddress);
      });

    this.orderTaxiForm.controls['arrivalAddress'].valueChanges
      .pipe(takeUntil(this.destroyAddress$))
      .subscribe((pickupAddress: Address) => {
        this.mapService.setEndPointOfPath(pickupAddress);
      });
  }

  ngOnDestroy(): void {
    this.destroyAddress$.next(null);
    this.destroyAddress$.complete();
  }

  callTheTaxi() {
    if (this.orderTaxiForm.value && this.orderTaxiForm.valid) {
      this.tripService.createNewTrip(this.orderTaxiForm.value);
    }
  }

  onSetTariff(value: string) {
    this.orderTaxiForm.get('tariff')?.setValue(value);
  }

  generateInitialAddress() {
    this.mapService.getPosition().subscribe((pos) => {
      const { latitude, longitude } = pos.coords;

      const currentCoordinate: Coordinate = {
        latitude,
        longitude,
      };

      this.mapService.getPositionByLocation(currentCoordinate).subscribe((address) => {
        if (address[0]) {
          this.orderTaxiForm.get('pickupAddress')?.setValue(address[0]);
        }
      }); // to get name of street by coordinates
    });
  }
}
