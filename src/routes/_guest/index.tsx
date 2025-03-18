import { createFileRoute } from '@tanstack/react-router'
import Home from '@/features/(guest)/home'

export const Route = createFileRoute('/_guest/')({
  component: Home,
})
