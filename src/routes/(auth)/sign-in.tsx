import { createFileRoute, redirect } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'
import { authProtected } from '@/services/auth.service.ts'

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: async () => {
    const isProtected = await authProtected();
    if (isProtected) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: SignIn,
})
