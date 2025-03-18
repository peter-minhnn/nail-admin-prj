import { createLazyFileRoute } from '@tanstack/react-router'
import NotFoundError from '@/features/(admin)/errors/not-found-error'

export const Route = createLazyFileRoute('/admin/(errors)/404')({
  component: NotFoundError,
})
