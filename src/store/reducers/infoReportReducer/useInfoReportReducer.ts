import { ProductState, setInfoAction } from './index';
import { useAppSelect } from "@/store/hooks";
import { useDispatch } from "react-redux";

export const useInfoReportReducer = () => {
  // Variável responsável por definir um novo valor
  const dispatch = useDispatch();
  const { productInfoReport } = useAppSelect((state) => state.infoReportReducer);

  // Função que será exportada globalmente de forma a ser setada no componente principal
  const setInfoReportProduct = (currentUser: ProductState) => {
    dispatch(setInfoAction(currentUser));
  };

  return {
    productInfoReport,
    setInfoReportProduct,
  };
};
