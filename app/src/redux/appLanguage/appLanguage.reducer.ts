import { AppLanguage, AppLanguageAction } from "./appLanguage.types";

export const appLanguage = (
  prevSate: AppLanguage = "zh_tw",
  action: AppLanguageAction
) => {
  let newState = prevSate;
  if (action.type === "set_app_language") {
    newState = action.payload;
    return newState;
  } else {
    return prevSate;
  }
};
