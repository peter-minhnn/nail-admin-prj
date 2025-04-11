import { apiGuestRoutes } from '@/config/guest.api.route.ts'

import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType, PostsFilterParams } from '@/types'
import { useGlobalAxios } from '@/hooks/use-axios.ts'
import { BannerPublicDataType, BannerPublicFilterParams } from '@/types/(guest)/banner.type'
import { PostPublicType } from '@/types/(guest)'

export const getPosts = async (params: PostsFilterParams) => {
  try {
    const response = await useGlobalAxios.get<
      null,
      BaseResponseType,
      PostPublicType
    >(apiGuestRoutes.posts.withParams(params))
    return handleApiResponse<PostPublicType>(response)
  } catch (e) {
    return handleApiCatchResponse<PostPublicType>(e)
  }
}
export const getPostDetail = async (id: number) => {
  try {
    const response = await useGlobalAxios.get<
      null,
      BaseResponseType,
      PostPublicType
    >(apiGuestRoutes.post.withId(id))
    return handleApiResponse<PostPublicType>(response)
  } catch (e) {
    return handleApiCatchResponse<PostPublicType>(e)
  }
}
export const getBanners = async (params: BannerPublicFilterParams) => {
  try {
    const response = await useGlobalAxios.get<
      null,
      BaseResponseType,
      BannerPublicDataType
    >(apiGuestRoutes.banners.withParams(params))
    return handleApiResponse<BannerPublicDataType>(response)
  } catch (e) {
    return handleApiCatchResponse<BannerPublicDataType>(e)
  }
}
