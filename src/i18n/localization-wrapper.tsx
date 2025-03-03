import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import get from 'lodash/get'
import merge from 'lodash/merge'
import { IntlProvider } from 'react-intl'
import { LocalStorageStateType } from '@/types/base.type.ts'
import { Locale } from '@/types/lang.type.ts'
import { languages } from '@/entities/languages'
import { LocalStorageKey } from '@/config/base.enum.ts'
import { ILangStateData, useLocaleStore } from '@/stores/lang-store.ts'

const localeStateKey = 'state.locale'

export const LocalizationWrapper = ({ children }: { children: ReactNode }) => {
  const { setLocale, locale } = useLocaleStore()

  const [messages, setMessages] = useState(null)

  const loadMessages = async (locale: Locale) => {
    const imports = languages.map(async (key: string) => {
      return await import(`./${locale}/${key}.json`)
    })
    const files = await Promise.all(imports)
    return files.reduce((acc, file) => merge(acc, file.default), {})
  }

  const handleSetLocale = useCallback(async () => {
    const cookieLocale = localStorage.getItem(
      LocalStorageKey.LOCALE,
    )! as unknown as LocalStorageStateType<ILangStateData>
    const locale = get(cookieLocale, localeStateKey, 'vi')
    const newMessages = await loadMessages(locale)
    setMessages(newMessages)
  }, [])

  const memoizedIntlProvider = useMemo(() => {
    const localeStore = localStorage.getItem(
      LocalStorageKey.LOCALE,
    )! as unknown as LocalStorageStateType<ILangStateData>
    const locale = get(localeStore, localeStateKey, 'vi')

    if (!messages) return null

    return (
      <IntlProvider
        locale={locale}
        messages={messages}
        onError={() => handleSetLocale().finally()}
      >
        {children}
      </IntlProvider>
    )
  }, [messages, children, handleSetLocale])

  useEffect(() => {
    handleSetLocale().finally()
  }, [locale, handleSetLocale])

  useEffect(() => {
    const cookieLocale = localStorage.getItem(
      LocalStorageKey.LOCALE,
    )! as unknown as LocalStorageStateType<ILangStateData>
    const locale = get(cookieLocale, localeStateKey, 'vi')
    setLocale(locale)
  }, [locale, setLocale])

  return memoizedIntlProvider
}
