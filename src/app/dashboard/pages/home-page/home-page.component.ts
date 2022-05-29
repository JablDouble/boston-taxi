import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Address } from 'src/app/common/interfaces';
import { CarrierInfo, Trip } from 'src/app/dashboard/interfaces';
import { MapService } from '../../services/map.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  pickupAddress: Address;
  arrivalAddress: Address;
  paymentWay: string;
  carrierInfo$: BehaviorSubject<CarrierInfo | null> = new BehaviorSubject<CarrierInfo | null>(null);

  constructor(public mapService: MapService, private tripService: TripService) { }

  ngOnInit(): void {
    combineLatest([this.mapService.pickupAddress$, this.mapService.arrivalAddress$, this.carrierInfo$])
      .subscribe(([pickupAddress, arrivalAddress, carrierInfo]) => {
        
        if (pickupAddress) {
          this.pickupAddress = pickupAddress;
        }

        if (arrivalAddress) {
          this.arrivalAddress = arrivalAddress;
        }

        if (pickupAddress && arrivalAddress && carrierInfo) {

          const trip: Trip = {
            pickupAddress,
            arrivalAddress,
            ...carrierInfo,
            time: new Date(),
            amount: Math.floor(Math.random() * 100),
            paymentWay: this.paymentWay
          }

          this.tripService.createNewTrip(trip).subscribe();
        }
      })
  }

  setPickupAddress(address: Address) {
    this.mapService.setPickupAddress(address);
  }

  setArrivalAddress(address: Address) {
    this.mapService.setArrivalAddress(address);
  }

  changePaymentWay(paymentWay: string) {
    this.paymentWay = paymentWay;
  }

  setCarrierInfo(carrierInfo: CarrierInfo) {
    this.carrierInfo$.next(carrierInfo);
  }

}
