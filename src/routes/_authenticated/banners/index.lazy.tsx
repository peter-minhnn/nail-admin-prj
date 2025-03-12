import { createLazyFileRoute } from '@tanstack/react-router'
import BannersComponent from '@/features/banners'

export const Route = createLazyFileRoute('/_authenticated/banners/')({
  component: BannersComponent,
})
