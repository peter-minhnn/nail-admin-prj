import { BannerPublicFilterParams } from '@/entities/(guest)/banner'
import { PostsFilterParams } from '@/types'
import { createQueryParams } from '@/utils'

export const apiGuestRoutes = {
  post: {
    general: '/post/published',
    withId: (id: number) => `/posts/published/${id}`,
  },
  posts: {
    general: '/posts/published',
    withParams: (params: PostsFilterParams) =>
      `/posts/published${createQueryParams({ ...params, order: 'DESC' })}`,
  },
  banners: {
    general: '/banners/published',
    withParams: (params: BannerPublicFilterParams) =>
      `/banners/published${createQueryParams({ ...params })}`,
  },
  albums: {
    general: '/albums/published',
    withParams: () => `/albums/published`,
  },
  productTypes: {
    general: '/productTypes/published',
    withParams: () => `/productTypes/published`,
  },
  products: {
    general: '/products/published',
    withParams: (params: PostsFilterParams) =>
      `/products/published${createQueryParams({ ...params, order: 'ASC' })}`,
  },
  product: {
    general: '/products/published',
    withId: (id: number) => `/products/published/${id}`,
  },
  contact: {
    general: '/contacts'
  }
}
