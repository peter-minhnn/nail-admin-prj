export type Locale = 'vi' | 'en'
export type LocaleCurrency = 'vi-VN' | 'en-US'
export type LocaleUnitCurrency = 'VND' | 'USD'

export const defaultLocale: Locale = 'vi'

export const locales: Locale[] = ['vi', 'en']

export const localeNames: Record<Locale, string> = {
  // en: "English",
  vi: 'Vietnamese',
  en: 'English (US)',
}

export type LocaleStateType = {
  state: {
    locale: Locale
  }
  version: number
}
