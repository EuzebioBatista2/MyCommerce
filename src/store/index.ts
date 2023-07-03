import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from './reducers/loadingReducers'
import menuProfileReducer from './reducers/menuProfileReducers'

export const store = configureStore({
  reducer: {
    loadingReducer,
    menuProfileReducer
    
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
