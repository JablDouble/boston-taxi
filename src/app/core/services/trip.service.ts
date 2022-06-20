import { Injectable } from '@angular/core';
import { delay, map, Observable, tap } from 'rxjs';
import { Taxi, TaxiDriver, Trip, TripResponse } from 'src/app/data/schema/trip';
import { TripDataService } from 'src/app/data/service/trip-data.service';
import { Address } from 'src/app/shared/types';
import { LOCAL_ERRORS } from '../errors/errors';
import { PaymentService } from './payment.service';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  pickupAddress: Address;

  arrivalAddress: Address;

  taxi: Taxi;

  isSearching: boolean;

  constructor(private tripDataService: TripDataService, private paymentService: PaymentService) {}

  createNewTrip() {
    this.findTaxiDriver().subscribe((taxiDriver: TaxiDriver) => {
      if (this.pickupAddress && this.arrivalAddress) {
        const trip: Trip = {
          pickupAddress: this.pickupAddress,
          arrivalAddress: this.arrivalAddress,
          taxiDriver,
          time: new Date(),
          amount: Math.floor(Math.random() * 100),
          paymentMethod: this.paymentService.paymentMethod,
        };

        return this.tripDataService
          .createNewTrip(trip)
          .pipe(
            tap(() => (this.isSearching = true)),
            delay(5000),
          )
          .subscribe(() => {
            this.isSearching = false;
            this.taxi = {
              taxiDriver,
              position: {
                latitude: this.pickupAddress.latitude - 0.00045840645,
                longitude: this.pickupAddress.longitude - 0.0001481538,
              },
            }; // mock taxi position. Point near user
          });
      } else {
        throw new Error(LOCAL_ERRORS['INVALID_TRIP']);
      }
    });
  }

  getAllTrips(): Observable<Trip[]> {
    return this.tripDataService.getAllTrips().pipe(
      map((response: TripResponse) => {
        if (response) {
          return Object.keys(response).map((key: string) => ({
            ...response[key],
            id: key,
          }));
        }

        return [];
      }),
    );
  }

  private findTaxiDriver() {
    return this.tripDataService.findTaxiDriver();
  }

  public setPickupAddress(address: Address) {
    this.pickupAddress = address;
  }

  public setArrivalAddress(address: Address) {
    this.arrivalAddress = address;
  }
}
