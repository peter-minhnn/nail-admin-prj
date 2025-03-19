import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useNavigate } from '@tanstack/react-router'
import { CookieStorageKeys } from '@/entities/common-data.ts'
import { logout } from '@/services/auth.service.ts'
import { User } from '@/types'
import { ChevronsUpDown, LogOut } from 'lucide-react'
import { FormattedMessage } from 'react-intl'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/(admin)/ui/avatar.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/(admin)/ui/dropdown-menu.tsx'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/(admin)/ui/sidebar.tsx'

export function NavUser() {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userInfo = Cookie.get(CookieStorageKeys.USER_INFO)
    if (!userInfo) {
      setUser({
        firstName: 'System',
        lastName: 'Admin',
        avatar: '/images/placeholder.png',
        userName: 'system',
        roleCode: 'USER',
        companyId: 1,
      })
      return
    }
    setUser(JSON.parse(userInfo))
  }, [])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={user?.avatar} alt={user?.firstName} />
                <AvatarFallback className='rounded-lg'>
                  {user?.firstName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {user?.firstName} {user?.lastName}
                </span>
                <span className='truncate text-xs'>{user?.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={user?.avatar} alt={user?.firstName} />
                  <AvatarFallback className='rounded-lg'>
                    {user?.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className='truncate text-xs'>{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const isLogout = await logout()
                if (isLogout) {
                  navigate({
                    to: '/admin/sign-in',
                    search: location.href,
                  }).finally()
                }
              }}
            >
              <LogOut />
              <FormattedMessage id='common.logout' />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
