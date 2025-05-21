import { apiGuestRoutes } from '@/config/guest.api.route'
import { BaseResponseType } from '@/types'
import { useGlobalAxios } from '@/hooks/use-axios'
import { handleApiCatchResponse, handleApiResponse } from '../api.service'
import SubscribeDataType from '@/features/(guest)/subscribe/data/shema'

export const sendSubscribe = async (data: SubscribeDataType) => {
  const body = {
    email: data.email
  }
  try {
    const response = await useGlobalAxios.post<null, BaseResponseType, object>(
      apiGuestRoutes.subscribe.general,
      body
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
