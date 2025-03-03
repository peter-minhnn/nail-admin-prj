import { LocalStorageKey } from '@/config/base.enum.ts'
import { Locale } from '@/types/lang.type.ts'
import { create } from 'zustand'
import { createJSONStorage, persist, devtools } from 'zustand/middleware'

export interface ILangStateData {
  key?: string
}

///////////////////////////LANGUAGE STORE///////////////////////////
interface LangState {
  lang: ILangStateData
  setLangKey: (key: string) => void
}

export const useLangStore = create<LangState>((set) => ({
  lang: {
    key: 'default',
  },
  setLangKey: (key) => set((state) => ({ lang: { ...state.lang, key } })),
}))

export const useLang = () => {
  return useLangStore((state) => state.lang)
}

///////////////////////////LOCALE STORE///////////////////////////
interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    devtools((set) => ({
      locale: 'vi',
      setLocale: (locale: Locale) => set({ locale }),
    })),
    {
      name: LocalStorageKey.LOCALE,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
