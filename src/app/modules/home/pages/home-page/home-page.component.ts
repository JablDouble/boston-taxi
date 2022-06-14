import { Component } from '@angular/core';
import { TripService } from 'src/app/core/services/trip.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(public tripService: TripService) {}
}
