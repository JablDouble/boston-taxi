import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TripService } from 'src/app/core/services/trip.service';
import { Trip, TripStatus } from 'src/app/data/schema/trip';
import { selectChosenTrip } from 'src/app/store/selectors/order.selector';
import { OrderState } from 'src/app/store/types';

@Component({
  selector: 'app-order-process-page',
  templateUrl: './order-process-page.component.html',
  styleUrls: ['./order-process-page.component.scss'],
})
export class OrderProcessPageComponent {
  public TripStatus = TripStatus;

  public chosenTrip$: Observable<Trip> = this.store.pipe(select(selectChosenTrip));

  constructor(
    private route: ActivatedRoute,
    private store: Store<OrderState>,
    public tripService: TripService,
  ) {
    this.route.params.subscribe((params) => {
      this.tripService.chooseTrip(params['tripId']);
    });
  }
}
