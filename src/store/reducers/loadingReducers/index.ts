import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoading {
  loading: boolean;
}

const initialState: ILoading = {
  loading: false,
};

export const loading = createSlice({
  name: 'loadingReducer',
  initialState,
  reducers: {
    setActivatedLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setActivatedLoadingAction } = loading.actions;

export default loading.reducer;
