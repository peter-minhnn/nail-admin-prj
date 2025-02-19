import { useEffect, useState } from 'react'

interface LocalStorageProps<T> {
  key: string
  defaultValue: T
}

export function useLocalStorage<T>({
  key,
  defaultValue,
}: LocalStorageProps<T>) {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    if (typeof localStorage !== 'undefined')
      localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as const
}
