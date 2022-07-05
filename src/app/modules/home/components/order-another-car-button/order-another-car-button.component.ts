import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/data/schema/trip';
import { OrderState } from 'src/app/store/types';
import { selectTrips } from 'src/app/store/selectors/order.selector';
import { TripService } from 'src/app/core/services/trip.service';

@Component({
  selector: 'app-order-another-car-button',
  templateUrl: './order-another-car-button.component.html',
  styleUrls: ['./order-another-car-button.component.scss'],
})
export class OrderAnotherCarButtonComponent {
  public trips$: Observable<Trip[]> = this.store.pipe(select(selectTrips));

  constructor(public store: Store<OrderState>, public tripService: TripService) {}
}
