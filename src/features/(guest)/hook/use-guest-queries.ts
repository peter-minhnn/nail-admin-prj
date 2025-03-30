import { useQuery } from '@tanstack/react-query'
import {
  getBanners,
  getPostDetail,
  getPosts,
} from '@/services/guest/home.service'
import { PostsFilterParams } from '@/types'
import get from 'lodash/get'
import { getAlbums } from '@/services/guest/guest.album.service'
import { getProductDetail, getProducts, getProductTypes } from '@/services/guest/guest.product.service'
import { ProductFilterParams } from '@/entities/(guest)/product'
import { BannerFilterParams } from '@/entities/(guest)/banner'

export const useGetPosts = (params: PostsFilterParams) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: async () => await getPosts(params),
    select: (response) =>
      get(response, ['result', 'data'], {
        list: [],
        meta: {
          page: 1,
          take: 10,
        },
      }),
    refetchOnWindowFocus: false,
  })
}
export const useGetPostDetail = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => await getPostDetail(id),
    select: (response) =>
      get(response, ['result']), refetchOnWindowFocus: false,
  })
}
export const useGetBanners = (params: BannerFilterParams) => {
  return useQuery({
    queryKey: ['banner', params],
    queryFn: async () => await getBanners(params),
    select: (response) =>
      get(response, ['result'], {
        data: [],
      }),
    refetchOnWindowFocus: false,
  })
}

export const useGetAlbums = () => {
  return useQuery({
    queryKey: ['album',],
    queryFn: async () => await getAlbums(),
    select: (response) =>
      get(response, ['result'], {
        data: [],
      }),
    refetchOnWindowFocus: false,
  })
}

export const useGetProductTypes = () => {
  return useQuery({
    queryKey: ['productTypes',],
    queryFn: async () => await getProductTypes(),
    select: (response) =>
      get(response, ['result'], {
        data: [],
      }),
    refetchOnWindowFocus: false,
  })
}

export const useGetProducts = (params: ProductFilterParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => await getProducts(params),
    select: (response) =>
      get(response, ['result', 'data'], {
        list: [],
        meta: {
          page: 1,
          take: 10,
        },
      }),
    refetchOnWindowFocus: false,
  })
}

export const useGetProductDetail = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => await getProductDetail(id),
    select: (response) =>
      get(response, ['result']), refetchOnWindowFocus: false,
  })
}

