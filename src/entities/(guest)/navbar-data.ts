import { menuRoutes } from '@/entities/(guest)/routes'
import { LanguageType, NavbarType } from '@/types'

export const navigation: NavbarType[] = [
  {
    name: 'Trang chủ',
    href: menuRoutes.home,
  },
  {
    name: 'Giới thiệu',
    href: menuRoutes.about,
  },
  {
    name: 'Dịch vụ',
    href: menuRoutes.services,
  },
  {
    name: 'Đào tạo',
    href: menuRoutes.training,
  },
  {
    name: 'Sản phẩm',
    href: menuRoutes.products,
  },
  {
    name: 'Liên hệ',
    href: menuRoutes.contact,
  },
]

export const languages: LanguageType[] = [
  {
    name: 'English (US)',
    locale: 'en',
    flag: '🇺🇸',
  },
  {
    name: 'Vietnamese',
    locale: 'vi',
    flag: '🇻🇳',
  },
]
