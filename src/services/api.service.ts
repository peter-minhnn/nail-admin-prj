'use client'

import { StatusCodes } from '@/config/base.enum.ts'
import { logout } from '@/services/auth.service.ts'
import { BaseResponseType, ResultType } from '@/types/base.type'
import get from 'lodash/get'
import { toast } from 'sonner'

export function handleApiResponse<T>(response: any) {
  const isSuccess = get(response.data, 'success', false)
  if (isSuccess) {
    return {
      type: 'success',
      result: response.data as BaseResponseType<T>,
    }
  }

  return {
    type: 'error',
    result: {
      data: {} as T,
      success: false,
      message: get(response, 'data.message', 'Something went wrong'),
    } as BaseResponseType<T>,
  }
}

export async function handleApiCatchResponse<T>(e: any): Promise<ResultType> {
  if (e?.code === 'ERR_NETWORK') {
    return {
      type: 'error',
      result: {
        success: false,
        message: 'Network error',
        data: null,
      } as BaseResponseType<T>,
    }
  }

  await redirectPageErrors(e)

  const messageError = get(
    e.response,
    ['data', 'errors', '0'],
    e.response?.data?.message || null
  )
  return {
    type: 'error',
    result: {
      success: false,
      message: messageError ?? null,
      data: null,
    } as BaseResponseType<T>,
  }
}

async function redirectPageErrors(e: any) {
  switch (e?.status) {
    case StatusCodes.NOT_FOUND:
      window.location.href = '/admin/404'
      break
    case StatusCodes.UNAUTHORIZED:
      await logout()
      break
    case StatusCodes.SERVICE_UNAVAILABLE:
      window.location.href = '/admin/503'
      break
    case StatusCodes.INTERNAL_SERVER_ERROR:
      window.location.href = '/admin/500'
      break
    default:
      break
  }
}

export function handleQueryResponse(
  response: any,
  messageStr: string,
  callback: (value: any) => void
) {
  const message = get(response, 'result.messages[0]', messageStr)
  if (!response.result.isSuccess) {
    toast.error(message)
    return
  }
  toast.success(message)
  callback(response.result.data)
}
