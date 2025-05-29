import { useEffect } from 'react'
import { usePopupStore } from '@/stores/popup-store'
import PopupDialog from './popup-dialog'

export default function GlobalPopup() {
  const isOpen = usePopupStore((s) => s.isOpen)
  const checkShouldShowPopup = usePopupStore((s) => s.checkShouldShowPopup)

  useEffect(() => {
    if (isOpen) {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0'))
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
    checkShouldShowPopup()
  }, [isOpen])

  return !isOpen ? <PopupDialog /> : null
}
