import { createFileRoute, redirect } from '@tanstack/react-router'
import { pageDetailComponents } from '@/entities/(guest)'

export const Route = createFileRoute('/_guest/$pageId/$id/')({
  beforeLoad: async ({ params }) => {
    const { pageId, id } = params
    if (!id || ['undefined', 'null'].includes(id)) {
      throw redirect({
        to: pageId,
        replace: true,
      })
    }
  },
  component: RoutingDetailPageComponent,
})

function RoutingDetailPageComponent() {
  const { pageId, id } = Route.useParams()
  return pageDetailComponents(pageId, id)
}
