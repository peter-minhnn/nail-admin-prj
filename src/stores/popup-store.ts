import { LocalStorageKey } from '@/config/base.enum'
import { create } from 'zustand'

interface PopupState {
  isOpen: boolean
  closePopup: () => void
  skipToDay: (isSkip: boolean) => void
  checkShouldShowPopup: () => void
  reset: () => void
}

const getTodayKey = () => {
  const today = new Date()
  return today.toISOString().slice(0, 10)
}

export const usePopupStore = create<PopupState>()((set) => {
  return {
    isOpen: false,
    checkShouldShowPopup: () => {
      const today = getTodayKey()
      const closedAt = localStorage.getItem(LocalStorageKey.SKIP_POPUP)
      if (closedAt == today) {
        set({ isOpen: true })
      }
    },
    skipToDay: (isSkip: boolean) => {
      if (isSkip) {
        const today = getTodayKey()
        localStorage.setItem(LocalStorageKey.SKIP_POPUP, today)
        return
      }
      localStorage.removeItem(LocalStorageKey.SKIP_POPUP)
    },
    closePopup: () => {
      set({ isOpen: true })
    },
    reset: () => {
      set({ isOpen: false })
    },
  }
})
