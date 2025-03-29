import { PaginationState } from '@tanstack/react-table'
import {
  ContactFilterParams,
  PostsFilterParams,
  ProductFilterParams,
} from '@/types'
import { ContactExportParams } from '@/types/contact.type.ts'
import { createQueryParams } from '@/utils'

export const apiRoutes = {
  login: '/auth/login',
  protected: '/auth/protected',
  logout: '/auth/logout',
  banners: {
    general: '/banners',
    withParams: (params: PaginationState) =>
      `/banners${createQueryParams({ page: params.pageIndex + 1, take: params.pageSize, order: 'DESC' })}`,
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
      `/posts${createQueryParams({ ...params, order: 'DESC' })}`,
    withId: (id: number) => `/posts/${id}`,
  },
  contacts: {
    general: '/contacts',
    exportExcel: (params: ContactExportParams) =>
      `/contacts/export${createQueryParams(params)}`,
    withParams: (params: ContactFilterParams) =>
      `/contacts${createQueryParams({ ...params, order: 'DESC' })}`,
  },
  product: {
    general: '/products',
    withParams: (params: ProductFilterParams) =>
      `/products/admin${createQueryParams({ ...params, order: 'DESC' })}`,
    withId: (id: number) => `/products/${id}`,
    productType: {
      general: '/productTypes',
      withParams: (params: PaginationState) =>
        `/productTypes${createQueryParams({ page: params.pageIndex + 1, take: params.pageSize, order: 'DESC' })}`,
      withId: (id: number) => `/productTypes/${id}`,
    },
  },
}
