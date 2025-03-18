import { createLazyFileRoute } from '@tanstack/react-router'
import GeneralError from '@/features/(admin)/errors/general-error'

export const Route = createLazyFileRoute('/admin/(errors)/500')({
  component: GeneralError,
})
