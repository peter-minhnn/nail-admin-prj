import { PaginationState } from '@tanstack/react-table'
import { apiRoutes } from '@/config/api.route.ts'
import {
  handleApiCatchResponse,
  handleApiResponse,
} from '@/services/api.service.ts'
import { BaseResponseType, ProductFilterParams, ProductListType } from '@/types'
import { ProductType } from '@/types/products.type.ts'
import { useAuthAxios } from '@/hooks/use-axios.ts'

export const getProducts = async (params: ProductFilterParams) => {
  try {
    const response = await useAuthAxios.get<
      null,
      BaseResponseType,
      ProductListType
    >(apiRoutes.product.withParams(params))
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

const createFormData = (data: ProductListType) => {
  const formData = new FormData()
  formData.append('productNameVi', data.productNameVi)
  formData.append('productNameEn', data.productNameEn)
  formData.append('descriptionVi', data.descriptionVi)
  formData.append('descriptionEn', data.descriptionEn)
  formData.append('contentVi', data.contentVi)
  formData.append('contentEn', data.contentEn)
  formData.append('price', String(data.price))
  formData.append('productType', String(data.productType))
  formData.append('sortOrder', String(data.sortOrder))
  formData.append('thumbnail', data.thumbnail ?? '')
  return formData
}

export const createProduct = async (data: ProductListType) => {
  try {
    const response = await useAuthAxios.postFormData<
      null,
      BaseResponseType,
      FormData
    >(apiRoutes.product.general, createFormData(data))
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const updateProduct = async (data: ProductListType) => {
  try {
    const response = await useAuthAxios.putFormData<
      null,
      BaseResponseType,
      FormData
    >(apiRoutes.product.withId(data.id!), createFormData(data))
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const deleteProduct = async (id: number) => {
  try {
    const response = await useAuthAxios.delete<null, BaseResponseType, null>(
      apiRoutes.product.withId(id)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

/*
 *  Product Type
 */
export const getProductTypes = async (params: PaginationState) => {
  try {
    const response = await useAuthAxios.get<
      null,
      BaseResponseType,
      ProductType
    >(apiRoutes.product.productType.withParams(params))
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const createProductType = async (data: ProductType) => {
  try {
    const response = await useAuthAxios.post<
      null,
      BaseResponseType,
      ProductType
    >(apiRoutes.product.productType.general, data)
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const updateProductType = async (data: ProductType) => {
  try {
    const response = await useAuthAxios.put<
      null,
      BaseResponseType,
      ProductType
    >(apiRoutes.product.productType.withId(data.id!), data)
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}

export const deleteProductType = async (id: number) => {
  try {
    const response = await useAuthAxios.delete<null, BaseResponseType, null>(
      apiRoutes.product.productType.withId(id)
    )
    return handleApiResponse<any>(response)
  } catch (e) {
    return handleApiCatchResponse<any>(e)
  }
}
