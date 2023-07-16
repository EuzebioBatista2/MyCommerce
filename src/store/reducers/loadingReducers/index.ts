import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Modelo para ser inserindo ao redux
interface ILoading {
  loading: boolean;
}

// Valor inicial mo modelo criado
const initialState: ILoading = {
  loading: false,
};

export const loading = createSlice({
  name: 'loadingReducer',
  initialState,
  reducers: {
    // Função responsável por verificar se os dados são validos para serem armazenados
    setActivatedLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setActivatedLoadingAction } = loading.actions;

export default loading.reducer;
