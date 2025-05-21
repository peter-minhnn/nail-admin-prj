import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { Toaster } from '@/components/(admin)/ui/toaster'
import LoadingPage from '@/components/(guest)/loading.tsx'
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
  pendingComponent: LoadingPage,
})
