import { setInfoAction } from './index';
import { useAppSelect } from "@/store/hooks";
import { ProductType, ProductTypeState } from '@/types/productType';
import { useDispatch } from "react-redux";

export const useInfoReportReducer = () => {
  const dispatch = useDispatch();
  const { productInfoReport } = useAppSelect((state) => state.infoReportReducer);

  const setInfoReportProduct = (currentUser: ProductType[]) => {
    dispatch(setInfoAction(currentUser));
  };

  return {
    productInfoReport,
    setInfoReportProduct,
  };
};
