import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './reducers/loginReducers'
import loadingReducer from './reducers/loadingReducers'

export const store = configureStore({
  reducer: {
    loginReducer,
    loadingReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
