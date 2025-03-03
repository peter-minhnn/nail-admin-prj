'use client'

import { ComponentProps } from 'react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: Readonly<ToasterProps>) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position='top-center'
      richColors
      {...props}
    />
  )
}

export { Toaster }
