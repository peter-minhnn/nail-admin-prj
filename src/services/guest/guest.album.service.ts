import { apiGuestRoutes } from '@/config/guest.api.route.ts'
import { AlbumPublicType } from '@/entities/(guest)/album'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType } from '@/types'
import { useGlobalAxios } from '@/hooks/use-axios.ts'

export const getAlbums = async () => {
  try {
    const response = await useGlobalAxios.get<
      null,
      BaseResponseType,
      AlbumPublicType
    >(apiGuestRoutes.albums.withParams())
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
