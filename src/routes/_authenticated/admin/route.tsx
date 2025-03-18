import Cookies from 'js-cookie'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authProtected } from '@/services/auth.service.ts'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { AppSidebar } from '@/components/(admin)/layout/app-sidebar'
import { Header } from '@/components/(admin)/layout/header.tsx'
import { ProfileDropdown } from '@/components/(admin)/profile-dropdown.tsx'
import { Search } from '@/components/(admin)/search.tsx'
import SkipToMain from '@/components/(admin)/skip-to-main.tsx'
import { ThemeSwitch } from '@/components/(admin)/theme-switch.tsx'
import { SidebarProvider } from '@/components/(admin)/ui/sidebar'

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: async ({ location }) => {
    const isProtected = await authProtected()
    if (!isProtected) {
      throw redirect({
        to: '/admin/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] duration-200 ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          <Header fixed>
            <Search />
            <div className='ml-auto flex items-center space-x-4'>
              <ThemeSwitch />
              <ProfileDropdown />
            </div>
          </Header>
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
