import { useQuery } from '@tanstack/react-query'
import {
  getBanners,
  getPosts,
} from '@/services/guest/home.service'
import { PostsFilterParams } from '@/types'
import get from 'lodash/get'
import { BannerFilterParams } from '@/types/banners.type'
import { getAlbums } from '@/services/guest/guest.album.service'

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
      get(response, ['result'],{
        data: [],
      } ),
    refetchOnWindowFocus: false,
  })
}

export const useGetAlbums = () => {
  return useQuery({
    queryKey: ['album', ],
    queryFn: async () => await getAlbums(),
    select: (response) =>
      get(response, ['result'],{
        data: [],
      } ),
    refetchOnWindowFocus: false,
  })
}

