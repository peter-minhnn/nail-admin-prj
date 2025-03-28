import { apiRoutes } from '@/config/api.route.ts'
import { authAxiosInstance } from '@/config/axios.config.ts'
import { StatusCodes } from '@/config/base.enum.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service'
import { BaseResponseType } from '@/types/base.type.ts'
import { UserLoginRequestType } from '@/types/user.type'
import { useAuthAxios } from '@/hooks/use-axios.ts'

export const login = async (data: UserLoginRequestType) => {
  try {
    const response = await useAuthAxios.post<
      null,
      BaseResponseType,
      UserLoginRequestType
    >(apiRoutes.login, data)
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const authProtected = async (): Promise<boolean> => {
  try {
    const response = await authAxiosInstance.post(apiRoutes.protected)
    return response.status === StatusCodes.CREATED
  } catch (e) {
    return false
  }
}

export const logout = async (): Promise<boolean> => {
  try {
    const response = await authAxiosInstance.post(apiRoutes.logout)
    return response.status === StatusCodes.CREATED
  } catch (e) {
    return false
  }
}
