import { createSlice } from '@reduxjs/toolkit';

const initialState = { token: '', role: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.token = action.payload?.token;
      state.role = action.payload?.role === 'user' ? 2 : 1;
    },
    removeUser: (state) => {
      return (state = {});
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
