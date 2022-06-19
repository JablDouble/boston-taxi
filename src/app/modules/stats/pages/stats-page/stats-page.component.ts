import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/core/services/trip.service';
import { Trip } from 'src/app/data/schema/trip';
import { PaymentMethod } from 'src/app/shared/types';

@Component({
  selector: 'app-stats',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
})
export class StatsPageComponent implements OnInit {
  headItems: string[] = [
    'Pickup Time',
    'Vehicle',
    'Pickup Address',
    'Arrival Address',
    'Tariff',
    'Amount',
    'Method Of Payment',
  ];

  trips: Trip[] = [];

  public PaymentMethod = PaymentMethod;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getAllTrips().subscribe((trips: Trip[]) => {
      this.trips = trips;
    });
  }
}
