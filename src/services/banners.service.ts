import { apiRoutes } from '@/config/api.route.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType, BannersRequestType, BannersListType } from '@/types'
import { useAxios } from '@/hooks/use-axios.ts'
import { BannersType } from '@/features/banners/data/schema.ts'

export const getBanners = async () => {
  try {
    const response = await useAxios.get<
      null,
      BaseResponseType,
      BannersListType
    >(apiRoutes.banners.general)
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const saveChanges = async (data: BannersRequestType) => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('file', data.file)

  try {
    const response = await useAxios.postFormData<
      null,
      BaseResponseType,
      FormData
    >(apiRoutes.banners.general, formData)
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const deleteBanners = async (id: number) => {
  try {
    const response = await useAxios.delete<null, BaseResponseType, BannersType>(
      apiRoutes.banners.delete(id)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
