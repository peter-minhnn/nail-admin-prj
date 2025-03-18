import { useContext } from 'react'
import { SeoContext } from '@/context/seo-provider.tsx'

export const useSeo = () => {
  const context = useContext(SeoContext)
  if (!context) {
    throw new Error('useSeo must be used within a SeoProvider')
  }
  return context
}
