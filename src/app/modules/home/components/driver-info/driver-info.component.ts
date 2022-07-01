import { Component, Input } from '@angular/core';
import { TripService } from 'src/app/core/services/trip.service';
import { Trip } from 'src/app/data/schema/trip';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss'],
})
export class DriverInfoComponent {
  @Input() trip: Trip;

  constructor(public tripService: TripService) {}
}
