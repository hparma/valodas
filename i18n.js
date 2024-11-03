import { I18n } from 'i18n-js';
import * as Localization from 'react-native-localize';

import en from './locales/en.json';
import de from './locales/de.json';
import lv from './locales/lv.json';

const i18n = new I18n({ en, de, lv });

const setI18nConfig = () => {
  const locales = Localization.getLocales();
  if (locales.length > 0) {
    const locale = locales[0].languageTag;
    const simpleLocale = locale.startsWith('lv') ? 'lv' : locale.split('-')[0];
    console.log("Detected Locale:", simpleLocale);
    i18n.locale = simpleLocale;
  }
};

export { i18n, setI18nConfig };
