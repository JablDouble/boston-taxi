import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MapService } from 'src/app/core/services/map.service';
import { TripService } from 'src/app/core/services/trip.service';
import { Trip } from 'src/app/data/schema/trip';
import { OrderState } from 'src/app/store/types';
import { selectChosenTrip } from 'src/app/store/selectors/order.selector';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public chosenTrip$: Observable<Trip> = this.store.pipe(select(selectChosenTrip));

  constructor(
    public tripService: TripService,
    public mapService: MapService,
    private store: Store<OrderState>,
  ) {
    this.tripService.getAllActiveTrips().subscribe(); // get active trips at init
  }
}
