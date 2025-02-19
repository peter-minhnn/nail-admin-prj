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

export const login = async <T>(data: UserLoginRequestType) => {
  try {
    const response = useAxios.post<
      T,
      BaseResponseType<T>,
      UserLoginRequestType
    >(apiRoutes.login, data)
    return handleApiResponse<T>(response)
  } catch (e) {
    return handleApiCatchResponse<T>(e)
  }
}

export const authProtected = async (): Promise<boolean> => {
  try {
    const response = await axiosConfig.post(apiRoutes.protected)
    return response.status === StatusCodes.OK
  } catch (e) {
    return false
  }
}
