import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { StorageKeys, loadSetting } from '../storage'

import en from './locales/en'
import ja from './locales/ja'
import ko from './locales/ko'
import vi from './locales/vi'

const savedLanguage = loadSetting<string>(StorageKeys.LANGUAGE, 'en')

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ko: { translation: ko },
    ja: { translation: ja },
    vi: { translation: vi },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
