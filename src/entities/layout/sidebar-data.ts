import {
  IconAlbum,
  IconBrandBlogger,
  IconCards,
  IconImageInPicture,
  IconLayoutDashboard,
} from '@tabler/icons-react'
import { Command } from 'lucide-react'
import { SidebarData } from '@/components/layout/types.ts'

export const sidebarData: SidebarData = {
  user: {
    name: 'minhnn',
    email: 'nnminh742@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'DEJAVU',
      logo: Command,
      plan: 'Admin Management',
    },
  ],
  navGroups: [
    {
      title: 'menu.group.general',
      items: [
        {
          title: 'menu.dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      title: 'menu.group.homepage',
      items: [
        {
          title: 'menu.banners',
          url: '/banners',
          icon: IconImageInPicture,
        },
        {
          title: 'menu.albums',
          url: '/albums',
          icon: IconAlbum,
        },
        {
          title: 'menu.posts',
          url: '/posts',
          icon: IconBrandBlogger,
        },
        {
          title: 'menu.contacts',
          url: '/contacts',
          icon: IconCards,
        },
      ],
    },
  ],
}
