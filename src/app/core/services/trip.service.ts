import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, Observable, tap } from 'rxjs';
import { Tariff, Taxi, TaxiDriver, TaxiOrder, Trip, TripStatus } from 'src/app/data/schema/trip';
import { TripDataService } from 'src/app/data/service/trip-data.service';
import { Address } from 'src/app/shared/types';
import {
  assignTaxiDriver,
  chooseTripIndex,
  createNewTrip,
  putTrips,
} from 'src/app/store/actions/order.action';
import { LOCAL_ERRORS } from '../errors/errors';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  taxi: Taxi;

  constructor(
    private tripDataService: TripDataService,
    private store: Store,
    private router: Router,
  ) {}

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
        this.router.navigate(['dashboard', 'home', 'order', name]);
        trip.id = name;

        if (trip.id) {
          this.store.dispatch(createNewTrip({ trip }));

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
    return this.tripDataService.getAllTrips();
  }

  getAllActiveTrips(): Observable<Trip[]> {
    return this.tripDataService
      .getAllActiveTrips()
      .pipe(tap((trips: Trip[]) => this.store.dispatch(putTrips({ trips }))));
  }

  private findTaxiDriver(trip: Trip) {
    if (!trip.id) {
      throw new Error(LOCAL_ERRORS['TRIP_NOT_CREATED']);
    }

    return this.tripDataService
      .findTaxiDriver()
      .pipe(delay(5000))
      .subscribe((taxiDriver: TaxiDriver) => {
        this.tripDataService.updateStatusOfTrip(trip.id!, TripStatus.Accepted).subscribe(() => {
          this.store.dispatch(
            assignTaxiDriver({
              tripId: trip.id!,
              taxiDriver: taxiDriver,
            }),
          );
          this.taxi = this.generateTaxiDriverPosition(taxiDriver, trip.pickupAddress);
        });
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

  getVehicleInfoByTaxiDriver = (taxiDriver: TaxiDriver): null | string => {
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
  };
}
