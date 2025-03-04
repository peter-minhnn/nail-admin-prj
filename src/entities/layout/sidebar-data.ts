import {
  IconBarrierBlock,
  IconBug,
  IconEdit,
  IconError404,
  IconImageInPicture,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconServerOff,
  IconUserOff,
  IconUsers,
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
      name: 'Nail Admin',
      logo: Command,
      plan: 'Professional Management',
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
          title: 'menu.users',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'Samples',
      items: [
        {
          title: 'Editor',
          icon: IconEdit,
          url: '/samples/editor',
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: IconLockAccess,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
  ],
}
