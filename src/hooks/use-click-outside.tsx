import { useEffect } from 'react'

const useClickOutsideDialog = (id: string, onClickOutside: () => void) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const dialog = document.getElementById(id)
      if (dialog && !dialog.contains(event.target as Node)) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [onClickOutside])
}

export default useClickOutsideDialog
