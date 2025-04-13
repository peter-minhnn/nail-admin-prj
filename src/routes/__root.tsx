import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/(admin)/ui/toaster'
import GeneralError from '@/features/(admin)/errors/general-error'
import NotFoundError from '@/features/(admin)/errors/not-found-error'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <Outlet />
        <Toaster position='top-right' richColors />
        {import.meta.env.MODE === 'development' && (
          <>
            <ReactQueryDevtools buttonPosition='bottom-left' />
            <TanStackRouterDevtools position='bottom-right' />
          </>
        )}
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: () => {
    const { pathname } = useLocation()
    const isAdminPage = pathname.includes('/admin')
    const navigate = useNavigate()
    if (!isAdminPage) {
      navigate({
        href: pathname,
      }).finally()
    }
    return <GeneralError />
  },
})
