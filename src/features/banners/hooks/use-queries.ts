import { useMutation, useQuery } from '@tanstack/react-query'
import {
  deleteBanners,
  getBanners,
  saveChanges,
} from '@/services/banners.service.ts'
import { BannersRequestType, ResultType } from '@/types'
import get from 'lodash/get'

type BannersQueryType = {
  onSuccess?: (response: ResultType) => Promise<void>
  onError?: (error: Error) => void
}

export const useGetBanners = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: async () => await getBanners(),
    select: (response) => get(response, ['result', 'data'], []),
    refetchOnWindowFocus: false,
  })
}

export const usePostBanners = ({
  onSuccess,
  onError,
}: Readonly<BannersQueryType>) => {
  return useMutation({
    mutationFn: async (data: BannersRequestType) => await saveChanges(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const useDeleteBanners = ({
  onSuccess,
  onError,
}: Readonly<BannersQueryType>) => {
  return useMutation({
    mutationFn: async (id: number) => await deleteBanners(id),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}
