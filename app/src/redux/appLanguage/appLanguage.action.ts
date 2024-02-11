import { AppLanguage, AppLanguageAction } from "./appLanguage.types";

export const appLanguageAction = (data: AppLanguage): AppLanguageAction => {
  return {
    type: "set_app_language",
    payload: data,
  };
};
