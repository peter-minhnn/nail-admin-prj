import React from 'react'
import { CommandMenu } from '@/components/command-menu'

interface SearchContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchContext = React.createContext<SearchContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export function SearchProvider({ children }: Readonly<Props>) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const memoizedValue = React.useMemo(
    () => ({ open, setOpen }),
    [open, setOpen]
  )

  return (
    <SearchContext.Provider value={memoizedValue}>
      {children}
      <CommandMenu />
    </SearchContext.Provider>
  )
}
