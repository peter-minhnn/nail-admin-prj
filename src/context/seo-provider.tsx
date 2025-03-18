import {
  createContext,
  ReactElement,
  ReactNode,
  useMemo,
  useState,
} from 'react'
import Seo, { SeoProps } from '@/components/(guest)/layout/seo.tsx'

type SeoContextProps = {
  setSeo: (seoProps: SeoProps) => void
}

export const SeoContext = createContext<SeoContextProps | undefined>(undefined)

export const SeoProvider = ({ children }: { children: ReactNode }) => {
  const [seoValues, setSeoValues] = useState<SeoProps | undefined>(undefined)

  const setSeo = (seoProps: SeoProps) => {
    setSeoValues({ ...seoProps })
  }

  const memoizedSeoValues = useMemo(() => ({ setSeo }), [setSeo])

  const memoizedSeo: ReactElement | null = useMemo(() => {
    if (!seoValues) return null

    return <Seo {...seoValues} />
  }, [seoValues])

  return (
    <SeoContext.Provider value={memoizedSeoValues}>
      {memoizedSeo}
      {children}
    </SeoContext.Provider>
  )
}
