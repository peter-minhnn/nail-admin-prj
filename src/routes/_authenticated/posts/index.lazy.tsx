import { createLazyFileRoute } from '@tanstack/react-router'
import PostsComponent from '@/features/posts'

export const Route = createLazyFileRoute('/_authenticated/posts/')({
  component: PostsComponent,
})
