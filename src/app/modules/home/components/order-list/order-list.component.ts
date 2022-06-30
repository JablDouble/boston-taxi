import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Trip } from 'src/app/data/schema/trip';
import { selectTrips } from 'src/app/store/selectors/order.selector';
import { OrderState } from 'src/app/store/types';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnDestroy {
  private readonly destroyTrips$ = new Subject();

  private trips$: Observable<Trip[]> = this.store.pipe(
    select(selectTrips),
    takeUntil(this.destroyTrips$),
  );

  public trips: Trip[] = [];

  constructor(private store: Store<OrderState>) {
    this.trips$.subscribe((storedTrips: Trip[]) => {
      this.trips = storedTrips;
    });
  }

  ngOnDestroy(): void {
    this.destroyTrips$.next(null);
    this.destroyTrips$.complete();
  }
}
