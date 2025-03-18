import { createLazyFileRoute } from '@tanstack/react-router'
import AlbumsComponent from '@/features/(admin)/albums'

export const Route = createLazyFileRoute('/_authenticated/admin/albums/')({
  component: AlbumsComponent,
})
