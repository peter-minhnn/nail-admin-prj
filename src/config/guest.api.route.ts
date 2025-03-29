import { PostsFilterParams } from '@/types'
import { BannerFilterParams } from '@/types/banners.type'
import { createQueryParams } from '@/utils'

export const apiGuestRoutes = {
  posts: {
    general: '/posts/published',
    withParams: (params: PostsFilterParams) =>
      `/posts/published${createQueryParams({ ...params, order: 'DESC' })}`
  },
  banners: {
    general: '/banners/published',
    withParams: (params: BannerFilterParams) =>
      `/banners/published${createQueryParams({ ...params })}`,
  },
  albums: {
    general: '/albums/published',
    withParams: () =>
      `/albums/published`
  },
  productTypes: {
    general: '/productTypes/published',
    withParams: () =>
      `/productTypes/published`
  },
  products: {
    general: '/products/published',
    withParams: (params: PostsFilterParams) =>
      `/products/published${createQueryParams({ ...params, order: 'ASC' })}`
  },
}