import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Trip } from 'src/app/data/schema/trip';
import { orderNode } from '../reducers/order.reducer';
import { OrderState } from '../types';

export const getOrderState = createFeatureSelector<OrderState>(orderNode);

export const selectTrips = createSelector(getOrderState, (state: OrderState) => state.trips);

export const selectTrip = (tripId: string) =>
  createSelector(
    getOrderState,
    (state: OrderState) =>
      state.trips.find((trip) => {
        return trip.id === tripId;
      }) as Trip,
  );

export const selectChosenTrip = createSelector(
  getOrderState,
  (state: OrderState): Trip =>
    state.trips.find((trip) => {
      return trip.id === state.chosenTripId;
    }) as Trip,
);
