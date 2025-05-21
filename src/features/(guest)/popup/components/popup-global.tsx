
import { useEffect } from 'react'
import PopupDialog from './popup-dialog'
import { usePopupStore } from '@/stores/popup-store'

export default function GlobalPopup() {
    const isOpen = usePopupStore((s) => s.isOpen)
    const checkShouldShowPopup = usePopupStore((s) => s.checkShouldShowPopup)

    useEffect(() => {
        checkShouldShowPopup()
    }, [])

    return !isOpen ? <PopupDialog /> : null
}
