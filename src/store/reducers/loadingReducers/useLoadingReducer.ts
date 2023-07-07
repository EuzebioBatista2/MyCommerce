import { setActivatedLoadingAction } from './index';
import { useAppSelect } from "@/store/hooks";
import { useDispatch } from "react-redux";

export const useLoadingReducer = () => {
  const dispatch = useDispatch();
  const { loading } = useAppSelect((state: any) => state.loadingReducer);

  const setLoading = (currentUser: boolean) => {
    dispatch(setActivatedLoadingAction(currentUser));
  };

  return {
    loading,
    setLoading,
  };
};
