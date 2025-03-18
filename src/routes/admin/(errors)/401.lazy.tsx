import { createLazyFileRoute } from '@tanstack/react-router'
import UnauthorisedError from '@/features/(admin)/errors/unauthorized-error'

export const Route = createLazyFileRoute('/admin/(errors)/401')({
  component: UnauthorisedError,
})
