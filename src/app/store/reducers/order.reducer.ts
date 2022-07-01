import { createReducer, on } from '@ngrx/store';
import { TripStatus } from 'src/app/data/schema/trip';
import { assignTaxiDriver, createNewTrip, putTrips } from '../actions/order.action';
import { OrderState } from '../types';

export const orderNode = 'order';

export const initialState: OrderState = {
  trips: [],
};

export const orderReducer = createReducer(
  initialState,
  on(
    createNewTrip,
    (state, payload): OrderState => ({
      ...state,
      trips: [...state.trips, payload.trip],
    }),
  ),
  on(assignTaxiDriver, (state, payload): OrderState => {
    const updatedTrips = state.trips.map((trip) => {
      if (trip.id === payload.tripId) {
        return {
          ...trip,
          taxiDriver: payload.taxiDriver,
          status: TripStatus.Accepted,
        };
      }

      return trip;
    });

    return {
      ...state,
      trips: updatedTrips,
    };
  }),
  on(
    putTrips,
    (state, payload): OrderState => ({
      ...state,
      trips: payload.trips,
    }),
  ),
);
