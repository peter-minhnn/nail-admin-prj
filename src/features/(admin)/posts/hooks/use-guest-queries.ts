import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getPosts,
} from '@/services/guest/home.service'
import { PostsFilterParams } from '@/types'
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
