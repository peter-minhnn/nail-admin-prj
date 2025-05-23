import { useEffect } from 'react'
import { usePopupStore } from '@/stores/popup-store'
import PopupDialog from './popup-dialog'

export default function GlobalPopup() {
  const isOpen = usePopupStore((s) => s.isOpen)
  const checkShouldShowPopup = usePopupStore((s) => s.checkShouldShowPopup)

  useEffect(() => {
    if (!isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0'))
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
    checkShouldShowPopup()
  }, [isOpen])

  return !isOpen ? <PopupDialog /> : null
}
