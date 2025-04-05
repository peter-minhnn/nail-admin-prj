import { useMutation, useQuery } from '@tanstack/react-query'
import { BannerPublicFilterParams } from '@/entities/(guest)/banner'
import { ContactDataType } from '@/entities/(guest)/contact'
import { ProductFilterParams } from '@/entities/(guest)/product'
import { sendRequests } from '@/services/guest/contact.service'
import { getAlbums } from '@/services/guest/guest.album.service'
import {
  getProductDetail,
  getProducts,
  getProductTypes,
} from '@/services/guest/guest.product.service'
import {
  getBanners,
  getPostDetail,
  getPosts,
} from '@/services/guest/home.service'
import { PostsFilterParams, ResultType } from '@/types'
import get from 'lodash/get'

type ContatcsQueryType = {
  onSuccess?: (response: ResultType) => Promise<void>
  onError?: (error: Error) => void
}

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
    select: (response) => get(response, ['result']),
    refetchOnWindowFocus: false,
  })
}
export const useGetBanners = (params: BannerPublicFilterParams) => {
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
    queryKey: ['album'],
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
    queryKey: ['productTypes'],
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
    select: (response) => get(response, ['result']),
    refetchOnWindowFocus: false,
  })
}

export const useSendContact = ({
  onSuccess,
  onError,
}: Readonly<ContatcsQueryType>) => {
  return useMutation({
    mutationFn: async (data: ContactDataType) => await sendRequests(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}
