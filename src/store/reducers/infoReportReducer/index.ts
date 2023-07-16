import { ProductStateType, ProductType, ProductTypeState } from '@/types/productType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Modelo para ser inserindo ao redux
export interface ProductState {
  productInfoReport: ProductStateType
}

// Valor inicial mo modelo criado
const initialState: ProductState = {
  productInfoReport:{
    data: [{
      name: '',
      amount: 0,
      price: 0,
    }],
    user: ''
  }
}

export const productInfo = createSlice({
  name: 'productInfo',
  initialState,
  reducers: {
    // Função responsável por verificar se os dados são validos para serem armazenados
    setInfoAction: (state, action: PayloadAction<ProductState>) => {
      state.productInfoReport = action.payload.productInfoReport;
    },
  },
});

export const { setInfoAction } = productInfo.actions;

export default productInfo.reducer;
