import * as React from 'react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/(admin)/ui/sidebar.tsx'

export function TeamSwitcher({
  teams,
}: Readonly<{
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}>) {
  const [activeTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground'>
            <img alt='' src='/images/logo.svg' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{activeTeam.name}</span>
            <span className='truncate text-xs'>{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
