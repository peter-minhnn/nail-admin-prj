import { createFileRoute } from '@tanstack/react-router'
import GeneralError from '@/features/(admin)/errors/general-error'

export const Route = createFileRoute('/admin/(auth)/500')({
  component: GeneralError,
})
