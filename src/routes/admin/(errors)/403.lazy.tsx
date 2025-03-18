import { createLazyFileRoute } from '@tanstack/react-router'
import ForbiddenError from '@/features/(admin)/errors/forbidden'

export const Route = createLazyFileRoute('/admin/(errors)/403')({
  component: ForbiddenError,
})
