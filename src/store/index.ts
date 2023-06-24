import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './reducers/loginReducers'

export const store = configureStore({
  reducer: {
    loginReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
