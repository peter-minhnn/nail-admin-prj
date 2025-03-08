import { ComponentProps } from 'react'
import { Toaster as Sonner } from 'sonner'
import { useTheme } from '@/hooks/use-theme-context.tsx'

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
