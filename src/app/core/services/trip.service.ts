import { Injectable } from '@angular/core';
import { delay, map, Observable, tap } from 'rxjs';
import { Tariff, Taxi, TaxiDriver, TaxiOrder, Trip, TripResponse } from 'src/app/data/schema/trip';
import { TripDataService } from 'src/app/data/service/trip-data.service';
import { Address } from 'src/app/shared/types';
import { LOCAL_ERRORS } from '../errors/errors';
import { PaymentService } from './payment.service';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  taxi: Taxi;

  isSearching: boolean;

  constructor(private tripDataService: TripDataService, private paymentService: PaymentService) {}

  createNewTrip(taxiOrder: TaxiOrder) {
    this.findTaxiDriver().subscribe((taxiDriver: TaxiDriver) => {
      const { pickupAddress, arrivalAddress, tariff } = taxiOrder;

      if (pickupAddress && arrivalAddress) {
        const trip: Trip = {
          taxiDriver,
          time: new Date(),
          amount: this.calculateCostOfOrder(tariff),
          ...taxiOrder,
        };

        return this.tripDataService
          .createNewTrip(trip)
          .pipe(
            tap(() => (this.isSearching = true)),
            delay(5000),
          )
          .subscribe(() => {
            this.isSearching = false;
            this.taxi = this.generateTaxiDriverPosition(taxiDriver, pickupAddress);
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

  private calculateCostOfOrder(tariff: Tariff) {
    let tariffCost;

    switch (tariff) {
      case Tariff.Economy:
        tariffCost = 8;
        break;
      case Tariff.Standart:
        tariffCost = 11;
        break;
      case Tariff.Business:
        tariffCost = 16;
        break;
      case Tariff.Children:
        tariffCost = 10;
        break;
      default:
        tariffCost = 16;
        break;
    }

    return tariffCost + Math.floor(Math.random() * 100);
  }

  private generateTaxiDriverPosition(taxiDriver: TaxiDriver, currentAddress: Address) {
    return {
      taxiDriver,
      position: {
        latitude: currentAddress.latitude - 0.00555850655,
        longitude: currentAddress.longitude - 0.0001481538,
      },
    }; // mock taxi position. Point near user
  }
}
