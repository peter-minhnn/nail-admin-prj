import axios, { AxiosResponse } from 'axios'
import { LocalStorageKey } from '@/config/base.enum.ts'
import { LocalStorageStateType } from '@/types/base.type.ts'

const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*', // Required for CORS
  },
  withCredentials: true,
})

authAxiosInstance.interceptors.request.use(async (config) => {
  const cookieLocale = localStorage.getItem(
    LocalStorageKey.LOCALE
  )! as unknown as LocalStorageStateType<{ locale: string }>
  config.headers['Accept-Language'] = cookieLocale.state?.locale ?? 'vi'
  return config
})

authAxiosInstance.interceptors.response.use(function (response: AxiosResponse) {
  return response
})

export default authAxiosInstance
