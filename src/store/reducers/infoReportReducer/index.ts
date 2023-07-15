import { ProductStateType, ProductType, ProductTypeState } from '@/types/productType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
  productInfoReport: ProductStateType
}

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
    setInfoAction: (state, action: PayloadAction<ProductState>) => {
      state.productInfoReport = action.payload.productInfoReport;
    },
  },
});

export const { setInfoAction } = productInfo.actions;

export default productInfo.reducer;
