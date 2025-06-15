import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en_US from "./en_US.json";
import zh_CN from "./zh_CN.json";

const lang = Localization.getLocales()[0]?.languageCode ?? "en";

export const resources = {
  en: en_US,
  zh: zh_CN,
} as const;

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: ["zh", "en"].includes(lang) ? lang : "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
