import { ProductTypeState } from '@/types/productType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Modelo para ser inserindo ao redux
interface ProductState {
  productId: ProductTypeState;
}

// Valor inicial mo modelo criado
const initialState: ProductState = {
  productId: {
    productFinal: {
      name: '',
      data: {
        name: '',
        amount: 0,
        price: 0,
      }
    },
    uid: ''
  }
};

export const update = createSlice({
  name: 'updateProduct',
  initialState,
  reducers: {
    // Função responsável por verificar se os dados são validos para serem armazenados
    setUpdateAction: (state, action: PayloadAction<ProductTypeState>) => {
      state.productId = action.payload;
    },
  },
});

export const { setUpdateAction } = update.actions;

export default update.reducer;
