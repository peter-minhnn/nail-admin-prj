import { apiGuestRoutes } from '@/config/guest.api.route.ts'
import { GuestProductDetailType, GuestProductTypeType, ProductFilterParams } from '@/entities/(guest)/product'
import { useGlobalAxios } from '@/hooks/use-axios'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType } from '@/types'
export const getProductTypes = async () => {
  try {
    const response = await useGlobalAxios.get<null, BaseResponseType, GuestProductTypeType>(
      apiGuestRoutes.productTypes.withParams()
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const getProducts = async (params: ProductFilterParams) => {
  try {
    const response = await useGlobalAxios.get<null, BaseResponseType, GuestProductDetailType>(
      apiGuestRoutes.products.withParams(params)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const getProductDetail = async (id: number) => {
  try {
    const response = await useGlobalAxios.get<null, BaseResponseType, GuestProductDetailType>(
      apiGuestRoutes.product.withId(id)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
