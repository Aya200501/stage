import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';


/// i need the config json file to be in the same directory as the i18n file

import en from '../translate/en.json';
import fr from '../translate/fr.json';



// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
};


i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LocalStorageBackend)
  .init({
    resources,
    fallbackLng: "en", // use en if detected lng is not available
    detection:{
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react:{
      useSuspense:false
    },
    cache:{
      enabled:true
    }
  });
  export default i18n; 
  
