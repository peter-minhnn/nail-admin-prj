import { apiRoutes } from '@/config/api.route.ts'
import axiosConfig from '@/config/axios.config.ts'
import { StatusCodes } from '@/config/base.enum.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service'
import { BaseResponseType } from '@/types/base.type.ts'
import { UserLoginRequestType } from '@/types/user.type'
import { useAxios } from '@/hooks/use-axios.ts'

export const login = async (data: UserLoginRequestType) => {
  try {
    const response = await useAxios.post<
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
    const response = await axiosConfig.post(apiRoutes.protected)
    return response.status === StatusCodes.CREATED
  } catch (e) {
    return false
  }
}

export const logout = async (): Promise<boolean> => {
  try {
    const response = await axiosConfig.post(apiRoutes.logout)
    return response.status === StatusCodes.CREATED
  } catch (e) {
    return false
  }
}
