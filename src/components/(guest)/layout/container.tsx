import React, { ReactElement, useMemo } from 'react'
import { cn } from '@/lib/utils.ts'
import { Footer } from './footer'
import { Navbar } from './nav-bar'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  header?: boolean
  fixedHeader?: boolean
}

export function Container(props: Readonly<ContainerProps>) {
  const { children, fixedHeader, className, header = true } = props

  const memoizedHeader: ReactElement | null = useMemo(() => {
    if (!header) return null

    return <Navbar fixedHeader={fixedHeader} />
  }, [header, fixedHeader])

  return (
    <>
      {memoizedHeader}
      <div className={cn('container mx-auto block pt-24', className)}>
        {children}
      </div>
      <Footer />
    </>
  )
}
