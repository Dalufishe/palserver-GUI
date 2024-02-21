import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { selectedGameSaveAction } from "./selectedGameSave.action";

const useSelectedGameSave = () => {
  const dispatch = useDispatch();
  const selectedGameSave = useSelector<RootState, string>(
    (state) => state.selectedGameSave || "test-save"
  );
  const setSelectedGameSave = (v: string) => {
    dispatch(selectedGameSaveAction(v));
  };

  return { selectedGameSave, setSelectedGameSave };
};

export default useSelectedGameSave;
