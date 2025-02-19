'use client'

import { StatusCodes } from '@/config/base.enum.ts'
import { BaseResponseType, ResultType } from '@/types/base.type'
import get from 'lodash/get'
import { toast } from 'sonner'

export function handleApiResponse<T>(response: any) {
  const isSuccess = get(response.data, 'isSuccess', null)
  if (!isSuccess) {
    return {
      type: 'success',
      result: response.data as BaseResponseType<T>,
    }
  }

  return {
    type: 'error',
    result: {
      data: {} as T,
      isSuccess: false,
      messages: get(response, 'data.messages', []),
      statusCode: response?.statusCode ?? StatusCodes.BAD_REQUEST,
    } as BaseResponseType<T>,
  }
}

export async function handleApiCatchResponse<T>(e: any): Promise<ResultType> {
  if (e?.code === 'ERR_NETWORK') {
    return {
      type: 'error',
      result: {
        isSuccess: false,
        messages: ['Network error'],
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      } as BaseResponseType<T>,
    }
  }

  await redirectPageErrors(e)

  const messageError = get(e.response, 'data.messages', [])
  return {
    type: 'error',
    result: {
      isSuccess: false,
      messages: messageError ?? ['Something went wrong'],
      statusCode: e?.status ?? StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
    } as BaseResponseType<T>,
  }
}

async function redirectPageErrors(e: any) {
  switch (e?.status) {
    case StatusCodes.NOT_FOUND:
      window.location.href = '/404'
      break
    case StatusCodes.UNAUTHORIZED:
      // await logout();
      break
    case StatusCodes.SERVICE_UNAVAILABLE:
      window.location.href = '/maintenance'
      break
    case StatusCodes.INTERNAL_SERVER_ERROR:
      window.location.href = '/500'
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
