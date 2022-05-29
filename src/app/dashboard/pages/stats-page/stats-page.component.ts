import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/dashboard/interfaces';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {

  headItems: string[] = ['Pickup Time', 'Vehicle', 'Pickup Address', 'Arrival Address', 'Amount', 'Way Of Payment'];
  trips: Trip[] = []

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.tripService.getAllTrips().subscribe((trips: Trip[]) => {
      this.trips = trips;
    });
  }

}
