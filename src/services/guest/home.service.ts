import { apiGuestRoutes } from '@/config/guest.api.route.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType, PostsFilterParams } from '@/types'
import { useGlobalAxios } from '@/hooks/use-axios.ts'
import { GuestPostDataType } from '@/entities/(guest)/post'
import { BannerFilterParams } from '@/entities/(guest)/banner'

export const getPosts = async (params: PostsFilterParams) => {
  try {
    const response = await useGlobalAxios.get<null, BaseResponseType, GuestPostDataType>(
      apiGuestRoutes.posts.withParams(params)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
export const getPostDetail = async (id: number) => {
  try {
    const response = await useGlobalAxios.get<null, BaseResponseType, GuestPostDataType>(
      apiGuestRoutes.post.withId(id)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
export const getBanners = async (params: BannerFilterParams) => {
  try {
    const response = await useGlobalAxios.get<null, BaseResponseType, GuestPostDataType>(
      apiGuestRoutes.banners.withParams(params)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
