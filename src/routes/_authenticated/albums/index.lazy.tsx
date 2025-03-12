import { createLazyFileRoute } from '@tanstack/react-router'
import AlbumsComponent from '@/features/albums'

export const Route = createLazyFileRoute('/_authenticated/albums/')({
  component: AlbumsComponent,
})
