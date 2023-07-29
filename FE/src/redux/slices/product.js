import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Instance } from '../../axios';
import { Routes } from '../../helpers/routeHelper';

const initialState = {
  data: '',
  Loader: false,
};

export const addProduct = createAsyncThunk('addProduct', async (data) => {
  try {
    const response = await Instance.post(Routes.product.add, data);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
});
export const updateProduct = createAsyncThunk('updateProduct', async (data) => {
  try {
    const response = await Instance.put(Routes.product.update, data);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
});
export const deleteProduct = createAsyncThunk('deleteProduct', async (data) => {
  try {
    const response = await Instance.delete(Routes.product.delete, data);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProdMessage: (state) => {
      state.Loader = null;
      state.data = '';
    },
  },
  extraReducers: {
    [addProduct.pending]: (state, action) => {
      state.Loader = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.Loader = false;
      state.data = action.payload?.message;
    },
    [addProduct.rejected]: (state, action) => {
      state.Loader = false;
    },
    [updateProduct.pending]: (state, action) => {
      state.Loader = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.Loader = false;
      state.data = action.payload?.message;
    },
    [updateProduct.rejected]: (state, action) => {
      state.Loader = false;
    },
    [deleteProduct.pending]: (state, action) => {
      state.Loader = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.Loader = false;
      state.data = action.payload?.message;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.Loader = false;
    },
  },
});

export const { resetProdMessage, removeFromCart, emptyCart } = productSlice.actions;

export default productSlice.reducer;
