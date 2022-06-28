import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MapService } from 'src/app/core/services/map.service';
import { TripService } from 'src/app/core/services/trip.service';
import { Trip, TripStatus } from 'src/app/data/schema/trip';
import { selectChosenTrip } from 'src/app/store/selectors/order.selector';
import { OrderState } from 'src/app/store/types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public chosenTrip$: Observable<Trip> = this.store.pipe(select(selectChosenTrip));

  public TripStatus = TripStatus;

  public chosenTripStatus: TripStatus;

  constructor(
    public tripService: TripService,
    public mapService: MapService,
    public store: Store<OrderState>,
  ) {
    this.chosenTrip$.subscribe((trip: Trip) => (this.chosenTripStatus = trip?.status));
  }
}
