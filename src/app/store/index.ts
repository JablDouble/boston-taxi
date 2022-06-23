import { orderReducer, orderNode } from './reducers/order.reducer';

const store = {
  [orderNode]: orderReducer,
};

export default store;
