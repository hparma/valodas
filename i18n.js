import { I18n } from 'i18n-js';
import * as Localization from 'react-native-localize';

import en from './locales/en.json';
import de from './locales/de.json';
import lv from './locales/lv.json';

// mainīgais i18n kas ir ar locales tulkojumiem
const i18n = new I18n({ en, de, lv });
//Funkcija I18n konfigurācijas iestatīšanai, pamatojoties uz sistēmas lokalizāciju
const setI18nConfig = () => {
  const locales = Localization.getLocales(); //sarkasts ar tām vērtībām
  if (locales.length > 0) {
    const locale = locales[0].languageTag; //dabū sistēmas locālas vērtības
    const simpleLocale = locale.split('-')[0];
    console.log("Detected Locale:", simpleLocale); //testing
    i18n.locale = simpleLocale; //set i18n kā local
  }
};

export { i18n, setI18nConfig }; // ndod parametrus App
