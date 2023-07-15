import { ProductState, setInfoAction } from './index';
import { useAppSelect } from "@/store/hooks";
import { useDispatch } from "react-redux";

export const useInfoReportReducer = () => {
  const dispatch = useDispatch();
  const { productInfoReport } = useAppSelect((state) => state.infoReportReducer);

  const setInfoReportProduct = (currentUser: ProductState) => {
    dispatch(setInfoAction(currentUser));
  };

  return {
    productInfoReport,
    setInfoReportProduct,
  };
};
