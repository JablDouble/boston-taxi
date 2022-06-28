import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, map, Observable } from 'rxjs';
import {
  Tariff,
  Taxi,
  TaxiDriver,
  TaxiOrder,
  Trip,
  TripResponse,
  TripStatus,
} from 'src/app/data/schema/trip';
import { TripDataService } from 'src/app/data/service/trip-data.service';
import { Address } from 'src/app/shared/types';
import {
  assignTaxiDriver,
  chooseTripIndex,
  createNewTrip,
} from 'src/app/store/actions/order.action';
import { LOCAL_ERRORS } from '../errors/errors';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  taxi: Taxi;

  isSearching: boolean;

  constructor(private tripDataService: TripDataService, private store: Store) {}

  createNewTrip(taxiOrder: TaxiOrder) {
    const { pickupAddress, arrivalAddress, tariff } = taxiOrder;

    if (pickupAddress && arrivalAddress) {
      const trip: Trip = {
        time: new Date(),
        amount: this.calculateCostOfOrder(tariff),
        status: TripStatus.Search,
        ...taxiOrder,
      };

      return this.tripDataService.createNewTrip(trip).subscribe(({ name }) => {
        trip.id = name;

        if (trip.id) {
          this.store.dispatch(createNewTrip({ trip }));
          this.isSearching = true;

          this.findTaxiDriver(trip);
        } else {
          throw new Error(LOCAL_ERRORS['TRIP_NOT_CREATED']);
        }
      });
    } else {
      throw new Error(LOCAL_ERRORS['INVALID_TRIP']);
    }
  }

  changeChosenTrip(tripIndex: number) {
    this.store.dispatch(chooseTripIndex({ tripIndex }));
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

  private findTaxiDriver(trip: Trip) {
    if (!trip.id) {
      throw new Error(LOCAL_ERRORS['TRIP_NOT_CREATED']);
    }

    return this.tripDataService
      .findTaxiDriver()
      .pipe(delay(5000))
      .subscribe((taxiDriver: TaxiDriver) => {
        this.store.dispatch(
          assignTaxiDriver({
            tripId: trip.id!,
            taxiDriver: taxiDriver,
          }),
        );
        this.isSearching = false;
        this.taxi = this.generateTaxiDriverPosition(taxiDriver, trip.pickupAddress);
      });
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
