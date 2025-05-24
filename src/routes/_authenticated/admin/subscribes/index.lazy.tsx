import { createLazyFileRoute } from '@tanstack/react-router'
import SubscribeComponent from '@/features/(admin)/subscribes'

export const Route = createLazyFileRoute('/_authenticated/admin/subscribes/')({
  component: SubscribeComponent,
})
