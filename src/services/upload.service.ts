import { apiRoutes } from '@/config/api.route.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType } from '@/types'
import { useAxios } from '@/hooks/use-axios.ts'

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  try {
    const response = await useAxios.postFormData<
      null,
      BaseResponseType,
      FormData
    >(apiRoutes.upload.general, formData)
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData()
  files.forEach((file) => formData.append('file', file))
  try {
    const response = await useAxios.post<null, BaseResponseType, FormData>(
      apiRoutes.upload.general,
      formData
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const deleteFile = async (fileName: string) => {
  try {
    const response = await useAxios.delete<null, BaseResponseType, FormData>(
      apiRoutes.upload.deleteFile(fileName)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
