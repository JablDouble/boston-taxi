import { Trip } from '../data/schema/trip';

export interface OrderState {
  trips: Trip[];
  chosenTripIndex: number;
}
