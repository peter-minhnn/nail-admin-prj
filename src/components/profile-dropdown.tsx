import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useNavigate } from '@tanstack/react-router'
import { IconLogout } from '@tabler/icons-react'
import { CookieStorageKeys } from '@/entities/common-data.ts'
import { logout } from '@/services/auth.service.ts'
import { User } from '@/types'
import { FormattedMessage } from 'react-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ProfileDropdown() {
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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user?.avatar} alt={user?.firstName} />
            <AvatarFallback>
              <img src='/images/placeholder.png' alt='' />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {user?.firstName} {user?.lastName}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const isLogout = await logout()
            if (isLogout) {
              navigate({ to: '/sign-in', search: location.href }).finally()
            }
          }}
        >
          <FormattedMessage id='common.logout' />
          <DropdownMenuShortcut>
            <IconLogout size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
