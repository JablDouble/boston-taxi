import { createAction } from '@ngrx/store';
import { TaxiDriver, Trip } from 'src/app/data/schema/trip';

export const createNewTrip = createAction(
  '[Order] Create New Trip',
  (payload: { trip: Trip }) => payload,
);
export const assignTaxiDriver = createAction(
  '[Order] Assign Taxi Driver',
  (payload: { tripId: string; taxiDriver: TaxiDriver }) => payload,
);
export const chooseTripIndex = createAction(
  '[Order] Choose Trip',
  (payload: { tripIndex: number }) => payload,
);
export const putTrips = createAction('[Order] Put Trips', (payload: { trips: Trip[] }) => payload);
