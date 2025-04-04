import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
