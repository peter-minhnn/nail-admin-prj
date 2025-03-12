import { PostsFilterParams } from '@/types/posts.type.ts'
import { createQueryParams } from '@/utils'

export const apiRoutes = {
  login: '/auth/login',
  protected: '/auth/protected',
  logout: '/auth/logout',
  banners: {
    general: '/banners',
    delete: (id: number) => `/banners/${id}`,
  },
  upload: {
    general: '/files',
    deleteFile: (fileName: string) => `/files/${fileName}`,
  },
  albums: {
    general: '/albums',
    withId: (id: number) => `/albums/${id}`,
  },
  posts: {
    general: '/posts',
    withParams: (params: PostsFilterParams) =>
      `/posts${createQueryParams({...params, order: 'DESC'})}`,
    withId: (id: number) => `/posts/${id}`,
  },
}
