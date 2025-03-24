import { apiGuestRoutes } from '@/config/guest.api.route.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType, PostsFilterParams, PostsType } from '@/types'
import { useGlobalAxios } from '@/hooks/use-axios.ts'
import PostType from '@/entities/(guest)/post'

export const getPosts = async (params: PostsFilterParams) => {
  try {
    const response = await useGlobalAxios.get<null, BaseResponseType, PostType>(
      apiGuestRoutes.posts.withParams(params)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
