import { SelectedGameSaveAction } from "./selectedGameSave.types";

export const selectedGameSaveAction = (
  data: string
): SelectedGameSaveAction => {
  return {
    type: "set_selected_game_save",
    payload: data,
  };
};
