import { createLazyFileRoute, LazyRoute } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'

export const Route: LazyRoute<any> = createLazyFileRoute('/(auth)/sign-in')({
  component: SignIn,
})
