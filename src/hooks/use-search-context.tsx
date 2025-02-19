import React from 'react'
import { SearchContext } from '@/context/search-context.tsx'

export const useSearch = () => {
  const searchContext = React.useContext(SearchContext)

  if (!searchContext) {
    throw new Error('useSearch has to be used within <SearchContext.Provider>')
  }

  return searchContext
}
