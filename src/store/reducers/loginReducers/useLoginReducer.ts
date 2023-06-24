import { useAppSelect } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { setUserPerfilAction } from ".";
import { UserType } from "@/types/userType";

export const useUserReducer = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelect((state) => state.loginReducer);

  const setUser = (currentUser: UserType) => {
    dispatch(setUserPerfilAction(currentUser));
  };

  return {
    user,
    setUser,
  };
};
