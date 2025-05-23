import { useMutation, useQuery } from '@tanstack/react-query'
import { sendRequests } from '@/services/guest/contact.service.ts'
import { getAlbums } from '@/services/guest/guest.album.service.ts'
import {
  getProductDetail,
  getProducts,
  getProductTypes,
} from '@/services/guest/guest.product.service.ts'
import {
  getBanners,
  getPostDetail,
  getPosts,
} from '@/services/guest/home.service.ts'
import { sendSubscribe } from '@/services/guest/subscribe.service.ts'
import { PostsFilterParams, ResultType } from '@/types'
import { BannerPublicFilterParams, ProductFilterParams } from '@/types/(guest)'
import get from 'lodash/get'
import { ContactDataType } from '../features/(guest)/contact/data/shema.ts'
import SubscribeDataType from '../features/(guest)/subscribe/data/shema.ts'

type ContactQueryType = {
  onSuccess?: (response: ResultType) => Promise<void>
  onError?: (error: Error) => void
}

type SubscribeQueryType = {
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
}: Readonly<ContactQueryType>) => {
  return useMutation({
    mutationFn: async (data: ContactDataType) => await sendRequests(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const useSendSubscribe = ({
  onSuccess,
  onError,
}: Readonly<SubscribeQueryType>) => {
  return useMutation({
    mutationFn: async (data: SubscribeDataType) => await sendSubscribe(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}
