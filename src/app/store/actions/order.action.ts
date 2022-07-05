import { createAction } from '@ngrx/store';
import { TaxiDriver, Trip } from 'src/app/data/schema/trip';
import { Coordinate } from 'src/app/shared/types';

export const createNewTrip = createAction(
  '[Order] Create New Trip',
  (payload: { trip: Trip }) => payload,
);
export const assignTaxiDriver = createAction(
  '[Order] Assign Taxi Driver',
  (payload: { tripId: string; taxiDriver: TaxiDriver; taxiPosition: Coordinate }) => payload,
);
export const putTrips = createAction('[Order] Put Trips', (payload: { trips: Trip[] }) => payload);
export const chooseTrip = createAction(
  '[Order] Choose Trip',
  (payload: { tripId: string | null }) => payload,
);
