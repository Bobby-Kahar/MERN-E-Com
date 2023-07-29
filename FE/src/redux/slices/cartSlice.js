import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Instance } from '../../axios';
import { Routes } from '../../helpers/routeHelper';

const initialState = {
  cartLoaderId: null,
  itemAdded: '',
  cartLoader: false,
  cartList: [],
};

export const addToCart = createAsyncThunk('addToCart', async (data) => {
  console.log(data);
  try {
    const response = await Instance.post(Routes.cart.cart, data);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
});

export const subTrackCart = createAsyncThunk('subTrackCart', async (data) => {
  console.log(data);
  try {
    const response = await Instance.put(Routes.cart.cart, data);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
});
export const myCartList = createAsyncThunk('myBucket', async () => {
  try {
    const response = await Instance.get(Routes.cart.cart);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
});
export const removeCart = createAsyncThunk('removeCart', async () => {
  try {
    const response = await Instance.delete(Routes.cart.cart);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
});
export const removeCartItem = createAsyncThunk('removeCartItem', async (data) => {
  try {
    const response = await Instance.post(Routes.cart.cartRemoveItem, data);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    emptyCart: (state) => {
      state.cart = [];
    },
    resetMessage: (state) => {
      state.cartLoaderId = null;
      state.itemAdded = '';
    },
  },
  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.cartLoaderId = action.meta.arg.product_id;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.cartLoaderId = null;
      state.itemAdded = action?.payload?.message;
    },
    [addToCart.rejected]: (state, action) => {
      state.cartLoaderId = null;
    },
    [subTrackCart.pending]: (state, action) => {
      state.cartLoaderId = action.meta.arg.product_id;
    },
    [subTrackCart.fulfilled]: (state, action) => {
      state.cartLoaderId = null;
      state.itemAdded = action?.payload?.message;
    },
    [subTrackCart.rejected]: (state, action) => {
      state.cartLoaderId = null;
    },
    [myCartList.pending]: (state, action) => {
      state.cartLoader = true;
    },
    [myCartList.fulfilled]: (state, action) => {
      state.cartLoader = false;
      state.cartList = action.payload;
      state.itemAdded = '';
    },
    [myCartList.rejected]: (state, action) => {
      state.cartLoader = false;
    },
    [removeCart.pending]: (state, action) => {
      state.cartLoader = true;
    },
    [removeCart.fulfilled]: (state, action) => {
      state.cartLoader = false;
      state.cartList = [];
    },
    [removeCart.rejected]: (state, action) => {
      state.cartLoader = false;
    },
    [removeCartItem.pending]: (state, action) => {
      state.cartLoaderId = action.meta.arg.product_id;
    },
    [removeCartItem.fulfilled]: (state, action) => {
      state.cartLoaderId = null;
      state.itemAdded = action?.payload?.message;
    },
    [removeCartItem.rejected]: (state, action) => {
      state.cartLoaderId = null;
    },
  },
});

export const { resetMessage, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
