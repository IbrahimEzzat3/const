import { createContext, useContext, useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "../data/translations";

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: translations,
  lng: "ar", // default language
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);
  const [direction, setDirection] = useState(
    i18n.language === "ar" ? "rtl" : "ltr"
  );

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setDirection(lang === "ar" ? "rtl" : "ltr");
  };

  const value = {
    t: i18n.t.bind(i18n),
    i18n,
    language,
    toggleLanguage,
    direction,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
