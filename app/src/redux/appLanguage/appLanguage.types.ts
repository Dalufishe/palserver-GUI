export type AppLanguageAction = {
  type: "set_app_language";
  payload: AppLanguage;
};

export type AppLanguage = "zh_tw" | "en";
