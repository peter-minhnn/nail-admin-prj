import { apiRoutes } from '@/config/api.route.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType, AlbumsRequestType, AlbumsType } from '@/types'
import { useAuthAxios } from '@/hooks/use-axios.ts'

export const getAlbums = async () => {
  try {
    const response = await useAuthAxios.get<null, BaseResponseType, AlbumsType>(
      apiRoutes.albums.general
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

const createFormData = (data: AlbumsRequestType) => {
  const formData = new FormData()
  formData.append('thumbnailTitleVi', data.thumbnailTitleVi)
  formData.append('thumbnailTitleEn', data.thumbnailTitleEn)
  formData.append('nameVi', data.nameVi)
  formData.append('nameEn', data.nameEn)
  formData.append('albumType', data.albumType)
  if (data.thumbnail) {
    formData.append('thumbnail', data.thumbnail)
  }
  if (data.deleteDetailIds?.length) {
    data.deleteDetailIds.forEach((id) =>
      formData.append('deleteDetailIds', String(id))
    )
  }
  if (data.files.length) {
    data.files.forEach((file) => formData.append('files', file))
  }
  return formData
}

export const createAlbum = async (data: AlbumsRequestType) => {
  try {
    const response = await useAuthAxios.postFormData<
      null,
      BaseResponseType,
      FormData
    >(apiRoutes.albums.general, createFormData(data))
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const updateAlbum = async (data: AlbumsRequestType) => {
  try {
    const response = await useAuthAxios.putFormData<
      null,
      BaseResponseType,
      FormData
    >(apiRoutes.albums.withId(data.id!), createFormData(data))
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const deleteAlbum = async (id: number) => {
  try {
    const response = await useAuthAxios.delete<null, BaseResponseType, null>(
      apiRoutes.albums.withId(id)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
