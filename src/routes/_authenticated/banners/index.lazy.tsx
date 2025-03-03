import { createLazyFileRoute } from '@tanstack/react-router'
import Banners from '@/features/banners'

export const Route = createLazyFileRoute('/_authenticated/banners/')({
  component: Banners,
})
