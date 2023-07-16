import { setUpdateAction } from './index';
import { useAppSelect } from "@/store/hooks";
import { ProductTypeState } from '@/types/productType';
import { useDispatch } from "react-redux";

export const useUpdateProductReducer = () => {
  // Variável responsável por definir um novo valor
  const dispatch = useDispatch();
  const { productId } = useAppSelect((state) => state.editProductReducer);

  // Função que será exportada globalmente de forma a ser setada no componente principal
  const setUpdateProduct = (currentUser: ProductTypeState) => {
    dispatch(setUpdateAction(currentUser));
  };

  return {
    productId,
    setUpdateProduct,
  };
};
