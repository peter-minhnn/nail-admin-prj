import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createAlbum,
  deleteAlbum,
  getAlbums,
  updateAlbum,
} from '@/services/albums.service.ts'
import { AlbumsRequestType, QueryType, ResultType } from '@/types'
import get from 'lodash/get'

export const useGetAlbums = () => {
  return useQuery({
    queryKey: ['albums'],
    queryFn: async () => await getAlbums(),
    select: (response) => get(response, ['result', 'data'], []),
    refetchOnWindowFocus: false,
  })
}

export const usePostAlbums = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (data: AlbumsRequestType) => await createAlbum(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const usePutAlbums = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (data: AlbumsRequestType) => await updateAlbum(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const useDeleteAlbum = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (id: number) => await deleteAlbum(id),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}
