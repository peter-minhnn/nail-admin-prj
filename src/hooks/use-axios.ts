import axiosConfig from '@/config/axios.config'
import { BaseResponseType } from '@/types/base.type'
import get from 'lodash/get'
import { toast } from 'sonner'

type ValueType<T> = T[] | T | BaseResponseType<T> | null

export const useAxios = {
  get: async <TData, TResponse, T>(url: string, params: T | object = {}) => {
    return await axiosConfig.get<TData, TResponse>(url, {
      params: params,
    })
  },
  post: async <TData, TResponse, T>(url: string, body: T) => {
    return await axiosConfig.post<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
  put: async <TData, TResponse, T>(url: string, body: T) => {
    return await axiosConfig.put<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
  delete: async <TData, TResponse, T>(url: string) => {
    return await axiosConfig.delete<TData, TResponse, T>(url)
  },
  upload: async <TData, TResponse, T>(url: string, body: T) => {
    return await axiosConfig.post<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  getResponse: <T>(
    response: BaseResponseType<T>,
    type: 'list' | 'object' | 'error' = 'list'
  ): ValueType<T> => {
    if (type === 'error') {
      const messages = get(response, 'messages', [])
      if (messages.length) {
        toast.error(messages.join(', '))
      }
      return response
    }

    if (type === 'list') {
      return get(response, 'data.data', []) as T[]
    }
    return get(response, 'data', null) as T
  },
}
