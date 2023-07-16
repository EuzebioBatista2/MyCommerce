import { setActivatedLoadingAction } from './index';
import { useAppSelect } from "@/store/hooks";
import { useDispatch } from "react-redux";

export const useLoadingReducer = () => {
  // Variável responsável por definir um novo valor
  const dispatch = useDispatch();
  const { loading } = useAppSelect((state: any) => state.loadingReducer);

  // Função que será exportada globalmente de forma a ser setada no componente principal
  const setLoading = (currentUser: boolean) => {
    dispatch(setActivatedLoadingAction(currentUser));
  };

  return {
    loading,
    setLoading,
  };
};
