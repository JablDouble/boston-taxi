import { createFeatureSelector, createSelector } from '@ngrx/store';
import { orderNode } from '../reducers/order.reducer';
import { OrderState } from '../types';

export const getOrderState = createFeatureSelector<OrderState>(orderNode);

export const selectTrips = createSelector(getOrderState, (state: OrderState) => state.trips);

export const selectChosenTripIndex = createSelector(
  getOrderState,
  (state: OrderState) => state.chosenTripIndex,
);

export const selectChosenTrip = createSelector(
  getOrderState,
  (state: OrderState) => state.trips[state.chosenTripIndex - 1],
);
