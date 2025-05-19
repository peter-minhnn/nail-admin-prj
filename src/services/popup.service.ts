import { apiRoutes } from '@/config/api.route.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType, Popup, PopupFilterParams } from '@/types'
import { useAuthAxios } from '@/hooks/use-axios.ts'
import { PopupDataType } from '@/features/(admin)/popup/data/schema.ts'

export const getPopups = async (params: PopupFilterParams) => {
  try {
    const response = await useAuthAxios.get<null, BaseResponseType, Popup>(
      apiRoutes.popup.withParams(params)
    )
    return handleApiResponse<Popup[]>(response)
  } catch (e) {
    return handleApiCatchResponse<Popup[]>(e)
  }
}

export const getPopupsPublished = async () => {
  try {
    const response = await useAuthAxios.get<null, BaseResponseType, Popup>(
      apiRoutes.popup.published
    )
    return handleApiResponse<Popup[]>(response)
  } catch (e) {
    return handleApiCatchResponse<Popup[]>(e)
  }
}

const createFormData = (data: PopupDataType) => {
  const formData = new FormData()
  if (data.id) {
    formData.append('id', String(data.id))
  }
  formData.append('url', data.url ?? '')
  formData.append('type', data.type ?? '')
  formData.append('isPublished', String(data.isPublished))
  if (data.type === 'image' && data.image) {
    ;(data.image as File[]).forEach((v) => formData.append('image', v ?? ''))
  }
  if (data.type === 'content') {
    formData.append('title', data.title ?? '')
    formData.append('content', data.content ?? '')
  }
  return formData
}

export const createPopup = async (data: PopupDataType) => {
  try {
    const response = await useAuthAxios.postFormData<
      null,
      BaseResponseType,
      FormData
    >(apiRoutes.popup.general, createFormData(data))
    return handleApiResponse(response)
  } catch (e) {
    return handleApiCatchResponse(e)
  }
}

export const updatePopup = async (data: PopupDataType) => {
  try {
    const response = await useAuthAxios.putFormData<
      null,
      BaseResponseType,
      FormData
    >(apiRoutes.popup.withId(data.id!), createFormData(data))
    return handleApiResponse(response)
  } catch (e) {
    return handleApiCatchResponse(e)
  }
}

export const deletePopup = async (id: number) => {
  try {
    const response = await useAuthAxios.delete<null, BaseResponseType, null>(
      apiRoutes.popup.withId(id)
    )
    return handleApiResponse(response)
  } catch (e) {
    return handleApiCatchResponse(e)
  }
}
