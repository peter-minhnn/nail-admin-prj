import { useMutation } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'
import { login } from '@/services/auth.service.ts'
import { UserLoginRequestType } from '@/types/user.type.ts'
import get from 'lodash/get'
import { toast } from 'sonner'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: UserLoginRequestType) => await login(data),
    onSuccess: (response: any) => {
      const message = get(
        response,
        'data.messages[0]',
        !response.data?.isSuccess
          ? 'Username or password incorrect. Please check!'
          : 'Login successful'
      )

      if (!response.data?.isSuccess) {
        return toast.error(message)
      }

      toast.success(message)
      redirect({
        to: '/',
      })
    },
    onError: () => toast.error('Login failed. Please try again!'),
  })
}
