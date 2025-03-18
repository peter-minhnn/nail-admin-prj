import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createPosts,
  deletePosts,
  getPosts,
  updatePosts,
} from '@/services/posts.service.ts'
import { PostsFilterParams, PostsType, QueryType, ResultType } from '@/types'
import get from 'lodash/get'

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

export const usePostPosts = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (data: PostsType) => await createPosts(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const usePutPosts = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (data: PostsType) => await updatePosts(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const useDeletePost = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (id: number) => await deletePosts(id),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}
