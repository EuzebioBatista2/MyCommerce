import { ProductType, ProductTypeState } from '@/types/productType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  productInfoReport: ProductType[];
}

const initialState: ProductState = {
  productInfoReport: [{
    name: '',
    amount: 0,
    price: 0,
  }]
}

export const productInfo = createSlice({
  name: 'productInfo',
  initialState,
  reducers: {
    setInfoAction: (state, action: PayloadAction<ProductType[]>) => {
      state.productInfoReport = action.payload;
    },
  },
});

export const { setInfoAction } = productInfo.actions;

export default productInfo.reducer;
