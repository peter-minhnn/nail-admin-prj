import { authAxiosInstance, globalAxiosInstance } from '@/config/axios.config'

/*
 * Use this hook for authentication requests
 */
export const useAuthAxios = {
  get: async <TData, TResponse, T>(url: string, params: T | object = {}) => {
    return await authAxiosInstance.get<TData, TResponse>(url, {
      params: params,
    })
  },
  post: async <TData, TResponse, T>(url: string, body: T) => {
    return await authAxiosInstance.post<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
  put: async <TData, TResponse, T>(url: string, body: T) => {
    return await authAxiosInstance.put<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
  delete: async <TData, TResponse, T>(url: string) => {
    return await authAxiosInstance.delete<TData, TResponse, T>(url)
  },
  postFormData: async <TData, TResponse, T>(url: string, body: T) => {
    return await authAxiosInstance.post<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  putFormData: async <TData, TResponse, T>(url: string, body: T) => {
    return await authAxiosInstance.put<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

/*
 *  Use this hook for global axios requests
 */
export const useGlobalAxios = {
  get: async <TData, TResponse, T>(url: string, params: T | object = {}) => {
    return await globalAxiosInstance.get<TData, TResponse>(url, {
      params: params,
    })
  },
  post: async <TData, TResponse, T>(url: string, body: T) => {
    return await globalAxiosInstance.post<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
  put: async <TData, TResponse, T>(url: string, body: T) => {
    return await globalAxiosInstance.put<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
  delete: async <TData, TResponse, T>(url: string) => {
    return await globalAxiosInstance.delete<TData, TResponse, T>(url)
  },
  postFormData: async <TData, TResponse, T>(url: string, body: T) => {
    return await globalAxiosInstance.post<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  putFormData: async <TData, TResponse, T>(url: string, body: T) => {
    return await globalAxiosInstance.put<TData, TResponse>(url, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
