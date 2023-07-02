import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IActivateMenu {
  activate: boolean;
}

const initialState: IActivateMenu = {
  activate: false,
};

export const activateSlice = createSlice({
  name: 'ActivateThemeReducer',
  initialState,
  reducers: {
    setActivateMenuAction: (state, action: PayloadAction<boolean>) => {
      state.activate = action.payload;
    },
  },
});

export const { setActivateMenuAction } = activateSlice.actions;

export default activateSlice.reducer;
