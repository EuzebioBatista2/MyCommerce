import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './reducers/loginReducers'
import loadingReducer from './reducers/loadingReducers'
import menuProfileReducer from './reducers/menuProfileReducers'

export const store = configureStore({
  reducer: {
    loginReducer,
    loadingReducer,
    menuProfileReducer
    
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
