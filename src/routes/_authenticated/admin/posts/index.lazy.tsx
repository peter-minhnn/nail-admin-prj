import { createLazyFileRoute } from '@tanstack/react-router'
import PostsComponent from '@/features/(admin)/posts'

export const Route = createLazyFileRoute('/_authenticated/admin/posts/')({
  component: PostsComponent,
})
