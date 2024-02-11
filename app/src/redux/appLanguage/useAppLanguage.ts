import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { appLanguageAction } from "./appLanguage.action";
import { AppLanguage } from "./appLanguage.types";

const useAppLanguage = () => {
  const dispatch = useDispatch();
  const appLanguage = useSelector<RootState, string>(
    (state) => state.appLanguage || ""
  );
  const setAppLanguage = (v: AppLanguage) => {
    dispatch(appLanguageAction(v));
  };
  return { appLanguage, setAppLanguage };
};

export default useAppLanguage;
