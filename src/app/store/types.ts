import { Trip } from '../data/schema/trip';

export interface OrderState {
  trips: Trip[];
  chosenTripId: string | null;
}
