import { apiRoutes } from '@/config/api.route.ts'
import { authAxiosInstance } from '@/config/axios.config.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import {
  BaseResponseType,
  ContactFilterParams,
  ContactType,
  ResultType,
} from '@/types'
import { ContactExportParams, SubscibesType } from '@/types/contact.type.ts'
import { useAuthAxios } from '@/hooks/use-axios.ts'

export const getContacts = async (params: ContactFilterParams) => {
  try {
    const response = await useAuthAxios.get<
      null,
      BaseResponseType,
      ContactType
    >(apiRoutes.contacts.withParams(params))
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const exportExcel = async (params: ContactExportParams) => {
  try {
    return await authAxiosInstance.get(apiRoutes.contacts.exportExcel(params), {
      responseType: 'blob',
    })
  } catch (e) {
    console.log('[ERROR] [downloadFile]: ', e)
  }
}

export const getSubscribes = async (
  params: ContactFilterParams
): Promise<ResultType<SubscibesType[]>> => {
  try {
    const response = await useAuthAxios.get<
      null,
      BaseResponseType,
      ContactFilterParams
    >(apiRoutes.contacts.withSubscribesParams(params))
    return handleApiResponse(response)
  } catch (e) {
    return handleApiCatchResponse(e)
  }
}
