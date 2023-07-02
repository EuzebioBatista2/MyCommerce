import { useAppSelect } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { setActivateMenuAction } from ".";
import { DataType } from "@/types/dataType";

export const useMenuProfile = () => {
  const dispatch = useDispatch();
  const { activate } = useAppSelect((state) => state.menuProfileReducer);

  const setMenu = (currentMenu: boolean) => {
    dispatch(setActivateMenuAction(currentMenu));
  };

  return {
    activate,
    setMenu,
  };
};
