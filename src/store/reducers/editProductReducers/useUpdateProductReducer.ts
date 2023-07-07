import { setUpdateAction } from './index';
import { useAppSelect } from "@/store/hooks";
import { ProductTypeState } from '@/types/productType';
import { useDispatch } from "react-redux";

export const useUpdateProductReducer = () => {
  const dispatch = useDispatch();
  const { productId } = useAppSelect((state) => state.editProductReducer);

  const setUpdateProduct = (currentUser: ProductTypeState) => {
    dispatch(setUpdateAction(currentUser));
  };

  return {
    productId,
    setUpdateProduct,
  };
};
