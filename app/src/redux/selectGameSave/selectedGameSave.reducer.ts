import { SelectedGameSaveAction } from "./selectedGameSave.types";

export const selectedGameSave = (
  prevSate: string = "test-save",
  action: SelectedGameSaveAction
) => {
  let newState = prevSate;
  if (action.type === "set_selected_game_save") {
    newState = action.payload;
    return newState;
  } else {
    return prevSate;
  }
};
