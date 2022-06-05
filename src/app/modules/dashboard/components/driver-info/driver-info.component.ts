import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { concatAll, first, map } from 'rxjs';
import { CarrierInfo, TaxiDriver, Vehicle } from '../../interfaces';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss'],
})
export class DriverInfoComponent implements OnInit {
  @Output() onSetCarrierInfo: EventEmitter<CarrierInfo> = new EventEmitter<CarrierInfo>();

  taxiDriver: TaxiDriver;

  vehicle: Vehicle;

  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<TaxiDriver[]>('https://jsonplaceholder.typicode.com/users', {
        params: {
          _limit: 1,
        },
      })
      .pipe(
        concatAll(),
        first(),
        map((item) => ({ ...item, phone: item.phone.slice(0, -7) })), // fix phone number
      )
      .subscribe((taxiDriver: TaxiDriver) => {
        this.taxiDriver = taxiDriver;

        this.vehicle = {
          brand: 'Chevrolet',
          model: 'Cruze',
          plateNumber: '7139PI-7',
        };

        this.onSetCarrierInfo.emit({
          taxiDriver: this.taxiDriver,
          vehicle: this.vehicle,
        });
      });
  }
}
