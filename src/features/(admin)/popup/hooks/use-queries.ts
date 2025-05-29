import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createPopup,
  deletePopup,
  getPopups,
  getPopupsPublished,
  updatePopup,
} from '@/services/popup.service.ts'
import { PopupFilterParams, QueryType, ResultType } from '@/types'
import get from 'lodash/get'
import { PopupDataType } from '@/features/(admin)/popup/data/schema.ts'

export const useGetPopups = (params: PopupFilterParams) => {
  return useQuery({
    queryKey: ['popup', params],
    queryFn: async () => await getPopups(params),
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

export const useGetPopupsPublished = () => {
  return useQuery({
    queryKey: ['popup-published'],
    queryFn: async () => await getPopupsPublished(),
    select: (response) =>
      get(response, ['result', 'data'], null) as PopupDataType | null,
    refetchOnWindowFocus: false,
  })
}

export const usePostPopup = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (data: PopupDataType) => await createPopup(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const usePutPopup = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (data: PopupDataType) => await updatePopup(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const useDeletePopup = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (id: number) => await deletePopup(id),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}
