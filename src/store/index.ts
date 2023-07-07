import { useUpdateProductReducer } from './reducers/editProductReducers/useUpdateProductReducer';
import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from './reducers/loadingReducers'
import menuProfileReducer from './reducers/menuProfileReducers'
import editProductReducer from './reducers/editProductReducers'

export const store = configureStore({
  reducer: {
    loadingReducer,
    menuProfileReducer,
    editProductReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
