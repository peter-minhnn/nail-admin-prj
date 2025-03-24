import { createLazyFileRoute } from '@tanstack/react-router'
import { pageComponents } from '@/entities/(guest)'

export const Route = createLazyFileRoute('/_guest/$pageId/')({
  component: RoutingPageComponent,
})

function RoutingPageComponent() {
  const { pageId } = Route.useParams()
  return pageComponents[pageId as keyof typeof pageComponents]
}
