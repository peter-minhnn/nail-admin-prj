import { createLazyFileRoute } from '@tanstack/react-router'
import BannersComponent from '@/features/(admin)/banners'

export const Route = createLazyFileRoute('/_authenticated/admin/banners/')({
  component: BannersComponent,
})
