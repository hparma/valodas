import { I18n } from 'i18n-js';
import * as Localization from 'react-native-localize';

import en from './locales/en.json';
import de from './locales/de.json';
import lv from './locales/lv.json';

// mainīgais i18n kas ir ar locales tulkojumiem
const i18n = new I18n({ en, de, lv });
//Funkcija I18n konfigurācijas iestatīšanai, pamatojoties uz sistēmas lokalizāciju
i18n.enableFallback = true; //ja sistēmas valoda tāda kas neeksistē
i18n.defaultLocale = 'en'; //tad defaults ir en


const setI18nConfig = (locale = null) => {
  const systemLocale = Localization.getLocales()[0].languageTag.split('-')[0];
  i18n.locale = locale || systemLocale;
  console.log("App Locale Set To:", i18n.locale);
};

export { i18n, setI18nConfig }; // ndod parametrus App
