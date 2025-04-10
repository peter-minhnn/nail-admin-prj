import { LocalStorageKeys } from '@/entities/languages'
import { PostPublicType } from '@/types/(guest)'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface PostsState {
  postsItem: PostPublicType | null
  setPostsItem: (product: PostPublicType | null) => void
}

export const usePostsStore = create<PostsState>()(
  persist(
    devtools((set) => ({
      postsItem: null,
      setPostsItem: (postsItem: PostPublicType | null) => set({ postsItem }),
    })),
    {
      name: LocalStorageKeys.POST,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
