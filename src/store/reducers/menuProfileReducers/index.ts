import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Modelo para ser inserindo ao redux
interface IActivateMenu {
  activate: boolean;
}

// Valor inicial mo modelo criado
const initialState: IActivateMenu = {
  activate: false,
};

export const activateSlice = createSlice({
  name: 'ActivateThemeReducer',
  initialState,
  reducers: {
    // Função responsável por verificar se os dados são validos para serem armazenados
    setActivateMenuAction: (state, action: PayloadAction<boolean>) => {
      state.activate = action.payload;
    },
  },
});

export const { setActivateMenuAction } = activateSlice.actions;

export default activateSlice.reducer;
