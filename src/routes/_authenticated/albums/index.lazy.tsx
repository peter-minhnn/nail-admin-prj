import { createLazyFileRoute } from '@tanstack/react-router'
import Albums from '@/features/albums'

export const Route = createLazyFileRoute('/_authenticated/albums/')({
  component: Albums,
})
