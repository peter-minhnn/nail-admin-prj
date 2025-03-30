import { createFileRoute, redirect } from '@tanstack/react-router'
import { pageComponents } from '@/entities/(guest)'

export const Route = createFileRoute('/_guest/$pageId/')({
  beforeLoad: async ({ params }) => {
    const { pageId } = params
    if (!pageId) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: RoutingPageComponent,
})

function RoutingPageComponent() {
  const { pageId } = Route.useParams()
  return pageComponents(pageId)
}
