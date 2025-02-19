import { ReactNode, useEffect, useMemo, useState } from 'react'
import { LocalStorageKey } from '@/config/base.enum.ts'
import { LocalStorageStateType } from '@/types/base.type.ts'
import { Locale } from '@/types/lang.type.ts'
import get from 'lodash/get'
import { IntlProvider } from 'react-intl'
import { ILangStateData, useLang, useLocaleStore } from '@/stores/langStore.ts'

const localeStateKey = 'state.locale'

export const LocalizationWrapper = ({ children }: { children: ReactNode }) => {
  const langStore = useLang()
  const { setLocale, locale } = useLocaleStore()

  const [messages, setMessages] = useState<any>(null)

  const loadMessages = async (locale: Locale) => {
    const langName = get(langStore, 'key', 'default')
    return (await import(`./${locale}/${langName}.json`))?.['default']
  }

  const handleSetLocale = async () => {
    const cookieLocale = localStorage.getItem(
      LocalStorageKey.LOCALE
    )! as unknown as LocalStorageStateType<ILangStateData>
    const locale = get(cookieLocale, localeStateKey, 'vi')
    const newMessages = await loadMessages(locale)
    setMessages(newMessages)
  }

  const memoizedIntlProvider = useMemo(() => {
    const localeStore = localStorage.getItem(
      LocalStorageKey.LOCALE
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
  }, [langStore, locale, messages])

  useEffect(() => {
    handleSetLocale().finally()
  }, [langStore, locale])

  useEffect(() => {
    const cookieLocale = localStorage.getItem(
      LocalStorageKey.LOCALE
    )! as unknown as LocalStorageStateType<ILangStateData>
    const locale = get(cookieLocale, localeStateKey, 'vi')
    setLocale(locale)
  }, [locale])

  return memoizedIntlProvider
}
