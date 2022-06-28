import { createReducer, on } from '@ngrx/store';
import { TripStatus } from 'src/app/data/schema/trip';
import { assignTaxiDriver, chooseTripIndex, createNewTrip } from '../actions/order.action';
import { OrderState } from '../types';

export const orderNode = 'order';

export const initialState: OrderState = {
  trips: [],
  chosenTripIndex: 0,
};

export const orderReducer = createReducer(
  initialState,
  on(
    createNewTrip,
    (state, payload): OrderState => ({
      ...state,
      trips: [...state.trips, payload.trip],
      chosenTripIndex: state.trips.length + 1,
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
    chooseTripIndex,
    (state, payload): OrderState => ({
      ...state,
      chosenTripIndex: payload.tripIndex,
    }),
  ),
);
