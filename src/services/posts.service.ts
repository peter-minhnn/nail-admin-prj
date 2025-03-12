import { apiRoutes } from '@/config/api.route.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType, PostsType } from '@/types'
import { PostsFilterParams } from '@/types/posts.type.ts'
import { useAxios } from '@/hooks/use-axios.ts'

export const getPosts = async (params: PostsFilterParams) => {
  try {
    const response = await useAxios.get<null, BaseResponseType, PostsType>(
      apiRoutes.posts.withParams(params)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

const createFormData = (data: PostsType) => {
  const formData = new FormData()
  formData.append('titleVi', data.titleVi)
  formData.append('titleEn', data.titleEn)
  formData.append('contentVi', data.contentVi)
  formData.append('contentEn', data.contentEn)
  formData.append('postType', data.postType)
  formData.append('isPublish', String(data.isPublish))
  formData.append('sortOrder', String(data.sortOrder))
  formData.append('thumbnail', data.thumbnail ?? '')
  return formData
}

export const createPosts = async (data: PostsType) => {
  try {
    const response = await useAxios.postFormData<
      null,
      BaseResponseType,
      FormData
    >(apiRoutes.posts.general, createFormData(data))
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const updatePosts = async (data: PostsType) => {
  try {
    const response = await useAxios.putFormData<
      null,
      BaseResponseType,
      FormData
    >(apiRoutes.posts.withId(data.id!), createFormData(data))
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const deletePosts = async (id: number) => {
  try {
    const response = await useAxios.delete<null, BaseResponseType, null>(
      apiRoutes.posts.withId(id)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
