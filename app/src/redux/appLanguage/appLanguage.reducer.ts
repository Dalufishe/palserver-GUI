import { AppLanguage, AppLanguageAction } from "./appLanguage.types";

export const appLanguage = (
  prevSate: AppLanguage = window.navigator.language === "zh-TW" ||
  window.navigator.language === "zh-CN"
    ? "zh_tw"
    : "en",
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
