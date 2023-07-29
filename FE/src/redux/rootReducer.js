import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/product';

const appReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  orders: orderReducer,
  product: productReducer,
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === 'user/removeUser') {
    state = initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
