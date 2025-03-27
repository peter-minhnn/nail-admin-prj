import {
  IconAlbum,
  IconBrandBlogger,
  IconCards,
  IconImageInPicture,
  IconLayoutDashboard,
  IconShoppingCart,
} from '@tabler/icons-react'
import { Command } from 'lucide-react'
import { SidebarData } from '@/components/(admin)/layout/types.ts'

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
          url: '/admin',
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      title: 'menu.group.homepage',
      items: [
        {
          title: 'menu.banners',
          url: '/admin/banners',
          icon: IconImageInPicture,
        },
        {
          title: 'menu.albums',
          url: '/admin/albums',
          icon: IconAlbum,
        },
        {
          title: 'menu.posts',
          url: '/admin/posts',
          icon: IconBrandBlogger,
        },
        {
          title: 'menu.contacts',
          url: '/admin/contacts',
          icon: IconCards,
        },
        {
          title: 'menu.products',
          url: '/admin/products',
          icon: IconShoppingCart,
        },
      ],
    },
  ],
}
