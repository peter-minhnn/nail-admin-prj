import { useQuery } from '@tanstack/react-query'
import {
  getBanners,
  getPosts,
} from '@/services/guest/home.service'
import { PostsFilterParams } from '@/types'
import get from 'lodash/get'
import { BannerFilterParams } from '@/types/banners.type'
import { getAlbums } from '@/services/guest/guest.album.service'
import { getProducts, getProductTypes } from '@/services/guest/guest.product.service'
import { ProductFilterParams } from '@/entities/(guest)/product'

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

