import { LocalStorageKeys } from '@/entities/languages'
import { GuestProductDetailType } from '@/types/(guest)'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface ProductState {
  product: GuestProductDetailType | null
  setProductItem: (product: GuestProductDetailType | null) => void
}

export const useProductStore = create<ProductState>()(
  persist(
    devtools((set) => ({
      product: null,
      setProductItem: (product: GuestProductDetailType | null) =>
        set({ product }),
    })),
    {
      name: LocalStorageKeys.PRODUCT,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
