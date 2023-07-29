import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import middleware from "./middleware";
import rootReducers from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',

  // without using the Thunk middleware,
  // we‘d get an error in the browser’s console reading
  // a non-serializable value was detected in the state.
  middleware,
});

export const persistor = persistStore(store);
export default store;
