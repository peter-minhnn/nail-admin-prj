import { ComponentProps, useEffect, useMemo, useState } from 'react'
import { sidebarData } from '@/entities/layout'
import { sidebarNoProductData } from '@/entities/layout/sidebar-data.ts'
import { useUserInfo } from '@/hooks/use-user-info.tsx'
import { NavGroup } from '@/components/(admin)/layout/nav-group.tsx'
import { NavUser } from '@/components/(admin)/layout/nav-user.tsx'
import { TeamSwitcher } from '@/components/(admin)/layout/team-switcher.tsx'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/(admin)/ui/sidebar.tsx'

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const [isMounted, setIsMounted] = useState(false)
  const userInfo = useUserInfo()

  const memoizedSidebarData = useMemo(() => {
    if (userInfo?.userName === 'admin2') {
      return sidebarNoProductData.navGroups
    }
    return sidebarData.navGroups
  }, [userInfo])

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  return (
    isMounted && (
      <Sidebar collapsible='icon' variant='floating' {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={sidebarData.teams} />
        </SidebarHeader>
        <SidebarContent>
          {memoizedSidebarData.map((props, index) => (
            <NavGroup key={`${props.title}-${index}`} {...props} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  )
}
