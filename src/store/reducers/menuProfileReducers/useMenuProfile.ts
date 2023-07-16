import { useAppSelect } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { setActivateMenuAction } from ".";

export const useMenuProfile = () => {
  // Variável responsável por definir um novo valor
  const dispatch = useDispatch();
  const { activate } = useAppSelect((state) => state.menuProfileReducer);

  // Função que será exportada globalmente de forma a ser setada no componente principal
  const setMenu = (currentMenu: boolean) => {
    dispatch(setActivateMenuAction(currentMenu));
  };

  return {
    activate,
    setMenu,
  };
};
