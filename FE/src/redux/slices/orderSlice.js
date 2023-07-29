import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = { orders: [] };

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state,action) => {
      const order_id = uuidv4();
      state.orders = [{ order_id, ...action.payload }, ...state.orders];
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },  
});


export const { createOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;