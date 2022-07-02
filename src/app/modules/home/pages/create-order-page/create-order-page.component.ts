import { Component } from '@angular/core';
import { TripService } from 'src/app/core/services/trip.service';

@Component({
  selector: 'app-create-order-page',
  templateUrl: './create-order-page.component.html',
  styleUrls: ['./create-order-page.component.scss'],
})
export class CreateOrderPageComponent {
  constructor(public tripService: TripService) {
    this.tripService.chooseTrip(null);
  }
}
