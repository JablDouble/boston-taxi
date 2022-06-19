import { Injectable } from '@angular/core';
import { delay, map, Observable, tap } from 'rxjs';
import { Taxi, TaxiDriver, Trip, TripResponse, TaxiOrder } from 'src/app/data/schema/trip';
import { TripDataService } from 'src/app/data/service/trip-data.service';
import { Address } from 'src/app/shared/types';
import { calculateCostOfOrder, generateTaxiDriverPosition } from 'src/app/shared/utils/trip.util';
import { LOCAL_ERRORS } from '../errors/errors';
import { PaymentService } from './payment.service';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  pickupAddress: Address;

  arrivalAddress: Address;

  taxi: Taxi;

  searching: boolean = false;

  constructor(private tripDataService: TripDataService, private paymentService: PaymentService) {}

  createNewTrip(taxiOrder: TaxiOrder) {
    this.findTaxiDriver().subscribe((taxiDriver: TaxiDriver) => {
      const { pickupAddress, arrivalAddress, tariff } = taxiOrder;

      if (pickupAddress && arrivalAddress) {
        const trip: Trip = {
          taxiDriver,
          time: new Date(),
          amount: calculateCostOfOrder(tariff),
          ...taxiOrder,
        };

        return this.tripDataService
          .createNewTrip(trip)
          .pipe(
            tap(() => (this.searching = true)),
            delay(5000),
          )
          .subscribe(() => {
            this.searching = false;
            this.taxi = generateTaxiDriverPosition(taxiDriver, pickupAddress);
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
