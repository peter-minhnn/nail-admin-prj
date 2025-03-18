import { ReactElement, ReactNode, ReactSVGElement } from 'react'

export type NavbarType = {
  name: string
  href: string
}

export type LanguageType = {
  name: string
  locale: string
  flag?: ReactNode | ReactElement | ReactSVGElement | string
}
