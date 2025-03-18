import { createFileRoute, redirect } from '@tanstack/react-router'
import { authProtected } from '@/services/auth.service.ts'
import SignIn from '@/features/(admin)/auth/sign-in'

export const Route = createFileRoute('/admin/(auth)/sign-in')({
  beforeLoad: async () => {
    const isProtected = await authProtected()
    if (isProtected) {
      throw redirect({
        to: '/admin',
      })
    }
  },
  component: SignIn,
})
