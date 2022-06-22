import { createReducer, on } from '@ngrx/store';
import { reset } from '../actions/order.action';
import { OrderState } from '../types';

export const orderNode = 'order';

export const initialState: OrderState = {
  trips: [],
};

export const orderReducer = createReducer(
  initialState,
  on(reset, (state) => ({
    ...state,
    trips: [],
  })),
);
