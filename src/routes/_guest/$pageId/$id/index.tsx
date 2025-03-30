import { createFileRoute, redirect } from '@tanstack/react-router'
import { pageDetailComponents } from '@/entities/(guest)'

export const Route = createFileRoute('/_guest/$pageId/$id/')({
  beforeLoad: async ({ params }) => {
    const { pageId, id } = params
    if (!id) {
      throw redirect({
        to: '/_guest/' + pageId,
      })
    }
  },
  component: RoutingDetailPageComponent,
})

function RoutingDetailPageComponent() {
  const { pageId, id } = Route.useParams()
  return pageDetailComponents(pageId, id)
}
