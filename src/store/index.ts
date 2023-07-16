import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from './reducers/loadingReducers'
import menuProfileReducer from './reducers/menuProfileReducers'
import editProductReducer from './reducers/editProductReducers'
import infoUserReducers from './reducers/infoUserReducers'
import infoReportReducer from './reducers/infoReportReducer'

export const store = configureStore({
  reducer: {
    loadingReducer,
    menuProfileReducer,
    editProductReducer,
    infoUserReducers,
    infoReportReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
