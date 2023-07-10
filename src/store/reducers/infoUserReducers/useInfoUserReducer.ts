import { setUserInfoAction, userInfo } from './index';
import { useAppSelect } from "@/store/hooks";
import { UserNegative } from '@/types/userType';
import { useDispatch } from "react-redux";

export const useInfoUserReducer = () => {
  const dispatch = useDispatch();
  const { userInfo } = useAppSelect((state) => state.infoUserReducers);

  const setUserInfo = (currentUser: {userInfo: {data: UserNegative, uidCart: string, uidUser: string}}) => {
    dispatch(setUserInfoAction(currentUser));
  };

  return {
    userInfo,
    setUserInfo,
  };
};
