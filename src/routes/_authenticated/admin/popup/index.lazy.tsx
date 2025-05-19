import { createLazyFileRoute } from '@tanstack/react-router'
import PopupComponent from '@/features/(admin)/popup'

export const Route = createLazyFileRoute('/_authenticated/admin/popup/')({
  component: PopupComponent,
})
