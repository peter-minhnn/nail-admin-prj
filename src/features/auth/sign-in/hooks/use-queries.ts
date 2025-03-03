import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import get from 'lodash/get'
import { toast } from 'sonner'
import { login } from '@/services/auth.service.ts'
import { UserLoginRequestType } from '@/types/user.type.ts'

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: UserLoginRequestType) => await login(data),
    onSuccess: (response) => {
      const isSuccess = get(response, 'result.success', false)
      const message = get(
        response,
        'result.message',
        !isSuccess
          ? 'Username or password incorrect. Please check!'
          : 'Login successful'
      )

      if (!isSuccess) {
        return toast.error(message)
      }
      toast.success(message)
      navigate({ to: '/' }).finally();
    },
    onError: () => toast.error('Login failed. Please try again!'),
  })
}
