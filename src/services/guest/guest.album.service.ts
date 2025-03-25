import { apiGuestRoutes } from '@/config/guest.api.route.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType,} from '@/types'
import { useGlobalAxios } from '@/hooks/use-axios.ts'
import { GuestAlbumDataType } from '@/entities/(guest)/album'

export const getAlbums = async () => {
  try {
    const response = await useGlobalAxios.get<null, BaseResponseType, GuestAlbumDataType>(
      apiGuestRoutes.albums.withParams()
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
