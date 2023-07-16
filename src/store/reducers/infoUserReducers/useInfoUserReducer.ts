import { setUserInfoAction, userInfo } from './index';
import { useAppSelect } from "@/store/hooks";
import { UserNegative } from '@/types/userType';
import { useDispatch } from "react-redux";

export const useInfoUserReducer = () => {
  // Variável responsável por definir um novo valor
  const dispatch = useDispatch();
  const { userInfo } = useAppSelect((state) => state.infoUserReducers);

  // Função que será exportada globalmente de forma a ser setada no componente principal
  const setUserInfo = (currentUser: {userInfo: {data: UserNegative, uidCart: string, uidUser: string}}) => {
    dispatch(setUserInfoAction(currentUser));
  };

  return {
    userInfo,
    setUserInfo,
  };
};
