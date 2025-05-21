import { useEffect } from 'react'
import { usePopupStore } from '@/stores/popup-store'
import PopupDialog from './popup-dialog'

export default function GlobalPopup() {
  const isOpen = usePopupStore((s) => s.isOpen)
  const checkShouldShowPopup = usePopupStore((s) => s.checkShouldShowPopup)

  useEffect(() => {
    checkShouldShowPopup()
  }, [])

  return !isOpen ? <PopupDialog /> : null
}
