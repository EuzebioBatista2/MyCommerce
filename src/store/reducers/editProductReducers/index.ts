import { ProductTypeState } from '@/types/productType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  productId: ProductTypeState;
}

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
    setUpdateAction: (state, action: PayloadAction<ProductTypeState>) => {
      state.productId = action.payload;
    },
  },
});

export const { setUpdateAction } = update.actions;

export default update.reducer;
