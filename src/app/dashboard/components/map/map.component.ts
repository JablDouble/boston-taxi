import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Address, Point } from 'src/app/shared/interfaces';
import { MapService } from '../../shared/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: Address;
  @Output() onDetermineCurrentLocation: EventEmitter<Address> = new EventEmitter();

  pickupAddress: Address;
  arrivalAddress: Address;
  taxiPoint: Point;

  zoom: number = 17;

  iconTaxi = {
    url: 'https://flomaster.club/uploads/posts/2021-11/thumbs/1635854509_54-flomaster-club-p-narisovannaya-mashina-sverkhu-krasivii-ris-74.png',
    scaledSize: {
      width: 70,
      height: 35
    }
  }

  constructor(
    public mapService: MapService,
  ) { }


  ngOnInit(): void {
    this.mapService.getPosition().subscribe(
      (pos) => {

        const currentLat = +pos.coords.latitude;
        const currentLng = +pos.coords.longitude;

        this.mapService.getPositionByLocation(currentLat, currentLng)
          .subscribe((address) => {
            if (address[0]) {
              this.mapService.setPickupAddress(address[0]);
            }
          }); // to get name of street by coordinates

      });


    combineLatest([this.mapService.pickupAddress$, this.mapService.arrivalAddress$])
      .subscribe(([pickupAddress, arrivalAddress]) => {
        if (pickupAddress) {
          this.pickupAddress = pickupAddress;
        }

        if (arrivalAddress) {
          this.arrivalAddress = arrivalAddress;
        }

        if (pickupAddress && arrivalAddress) {
          this.taxiPoint = {
            latitude: pickupAddress.latitude - 0.00045840645,
            longitude: pickupAddress.longitude - 0.0001481538
          }
        }
      });
  }


}
