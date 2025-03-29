import { useMutation, useQuery } from '@tanstack/react-query'
import { PaginationState } from '@tanstack/react-table'
import {
  createProduct,
  createProductType,
  deleteProduct,
  deleteProductType,
  getProducts,
  getProductTypes,
  updateProduct,
  updateProductType,
} from '@/services/product.service.ts'
import {
  ProductFilterParams,
  ProductListType,
  ProductType,
  QueryType,
  ResultType,
} from '@/types'
import get from 'lodash/get'

export const useGetProducts = (params: ProductFilterParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => await getProducts(params),
    select: (response) =>
      get(response, ['result', 'data'], {
        list: [],
        meta: {
          page: 1,
          take: 10,
        },
      }),
    refetchOnWindowFocus: false,
  })
}

export const usePostProduct = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (data: ProductListType) => await createProduct(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const usePutProduct = ({ onSuccess, onError }: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (data: ProductListType) => await updateProduct(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const useDeleteProduct = ({
  onSuccess,
  onError,
}: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (id: number) => await deleteProduct(id),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

/*
 *  Product Type Queries
 */
export const useGetProductTypes = (params: PaginationState) => {
  return useQuery({
    queryKey: ['product-types', params],
    queryFn: async () => await getProductTypes(params),
    select: (response) =>
      get(response, ['result', 'data'], {
        list: [],
        meta: {
          page: 1,
          take: 10,
        },
      }),
    refetchOnWindowFocus: false,
  })
}

export const usePostProductType = ({
  onSuccess,
  onError,
}: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (data: ProductType) => await createProductType(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const usePutProductType = ({
  onSuccess,
  onError,
}: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (data: ProductType) => await updateProductType(data),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}

export const useDeleteProductType = ({
  onSuccess,
  onError,
}: Readonly<QueryType>) => {
  return useMutation({
    mutationFn: async (id: number) => await deleteProductType(id),
    onSuccess: async (response) => await onSuccess?.(response as ResultType),
    onError: (error) => onError?.(error),
  })
}
