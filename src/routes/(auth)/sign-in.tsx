import { createFileRoute, redirect } from '@tanstack/react-router'
import { authProtected } from '@/services/auth.service.ts'
import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: async () => {
    const isProtected = await authProtected()
    if (isProtected) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: SignIn,
})
