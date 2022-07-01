import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { TripService } from 'src/app/core/services/trip.service';
import { Trip, TripStatus } from 'src/app/data/schema/trip';
import { selectTrip } from 'src/app/store/selectors/order.selector';
import { OrderState } from 'src/app/store/types';

@Component({
  selector: 'app-order-process-page',
  templateUrl: './order-process-page.component.html',
  styleUrls: ['./order-process-page.component.scss'],
})
export class OrderProcessPageComponent implements OnDestroy {
  private readonly destroyChosenTrips$ = new Subject();

  public TripStatus = TripStatus;

  public chosenTrip: Trip;

  constructor(
    private route: ActivatedRoute,
    private store: Store<OrderState>,
    public tripService: TripService,
    private router: Router,
  ) {
    this.route.params.subscribe((params) => {
      this.store
        .pipe(select(selectTrip(params['tripId'])), takeUntil(this.destroyChosenTrips$))
        .subscribe((trip: Trip) => {
          if (!trip) {
            this.router.navigate(['dashboard', 'home']);
          }
          this.chosenTrip = trip;
        });
    });
  }

  ngOnDestroy(): void {
    this.destroyChosenTrips$.next(null);
    this.destroyChosenTrips$.complete();
  }
}
