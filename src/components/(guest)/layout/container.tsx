import React, { ReactElement, useMemo } from 'react'
import { cn } from '@/lib/utils.ts'
import { useIsMobile } from '@/hooks/use-mobile.tsx'
import { Footer } from './footer'
import { Navbar } from './nav-bar'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  header?: boolean
  footer?: boolean
  fixedHeader?: boolean
}

export function Container(props: Readonly<ContainerProps>) {
  const isMobile = useIsMobile()

  const {
    children,
    fixedHeader,
    className,
    header = true,
    footer = true,
  } = props

  const memoizedHeader: ReactElement | null = useMemo(() => {
    if (!header) return null

    return <Navbar fixedHeader={isMobile ? true : fixedHeader} />
  }, [header, fixedHeader, isMobile])

  const memoizedFooter: ReactElement | null = useMemo(() => {
    if (!footer) return null

    return <Footer />
  }, [footer])

  return (
    <>
      {memoizedHeader}
      <div className={cn('container mx-auto block pt-24', className)}>
        {children}
      </div>
      {memoizedFooter}
    </>
  )
}
