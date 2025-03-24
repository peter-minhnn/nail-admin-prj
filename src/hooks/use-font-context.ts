import { useContext } from 'react'
import { FontContext } from '@/context/font-context.tsx'

export const useFont = () => {
  const context = useContext(FontContext)
  if (!context) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}
