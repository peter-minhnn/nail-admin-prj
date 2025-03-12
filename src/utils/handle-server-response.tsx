import { ResultType } from '@/types'
import { toast } from 'sonner'

export const handleServerResponse = (response: ResultType) => {
  if (response.type === 'error') {
    toast.error(
      response.result.message || 'An error occurred. Please try again later.'
    )
    return
  }
  toast.success(response.result.message)
}
