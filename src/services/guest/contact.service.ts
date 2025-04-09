import { apiGuestRoutes } from '@/config/guest.api.route'
import { BaseResponseType } from '@/types'
import { useGlobalAxios } from '@/hooks/use-axios'
import { handleApiCatchResponse, handleApiResponse } from '../api.service'
import { ContactDataType } from '@/features/(guest)/contact/data/shema'

export const sendRequests = async (data: ContactDataType) => {
  const body = {
    'firstName': data.name,
    'lastName': data.name,
    "address": data.address,
    "email": data.email,
    "phoneNumber": data.phone,
    "subject": data.topic,
    "content": data.content
  }
  try {
    const response = await useGlobalAxios.post<
      null,
      BaseResponseType,
      object
    >(apiGuestRoutes.contact.general, body)
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
