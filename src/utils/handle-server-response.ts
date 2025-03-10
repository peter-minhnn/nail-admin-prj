import { ResultType } from '@/types'
import get from 'lodash/get'
import { toast } from 'sonner'

export const handleServerResponse = (response: ResultType) => {
  if (response.type === 'error') {
    toast.error(
      get(
        response,
        ['result', 'message'],
        'An error occurred. Please try again later.'
      )
    )
    return
  }
  toast.success(get(response, ['result', 'message'], ''))
}
