import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/core/services/trip.service';
import { Trip } from 'src/app/data/schema/trip';

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
    'Amount',
    'Way Of Payment',
  ];

  trips: Trip[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getAllTrips().subscribe((trips: Trip[]) => {
      this.trips = trips;
    });
  }
}
