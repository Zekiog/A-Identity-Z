import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Translations are loaded lazily from the /public/locales directory
i18n
  // i18next-http-backend
  // loads translations from /public/locales/{{lng}}/{{ns}}.json
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    supportedLngs: ['en', 'no', 'sv', 'da', 'de', 'tr', 'ar'],
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // Language detector options
    detection: {
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },

    // Backend options
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // React options
    react: {
      useSuspense: true,
    },
  });

// Handle RTL languages like Arabic
document.documentElement.dir = i18n.dir();
document.documentElement.lang = i18n.language;

i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
});

export default i18n;