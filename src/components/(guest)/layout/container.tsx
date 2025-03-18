import React, { ReactElement, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Footer } from './footer'
import { Navbar } from './nav-bar'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  header?: boolean
  fixedHeader?: boolean
}

export function Container(props: Readonly<ContainerProps>) {
  const { children, fixedHeader, header = true } = props

  const memoizedHeader: ReactElement | null = useMemo(() => {
    if (!header) return null

    return <Navbar fixedHeader />
  }, [header, fixedHeader])

  return (
    <>
      {memoizedHeader}
      <div className={cn('container mx-auto block p-8', props.className)}>
        {children}
        <Footer />
      </div>
    </>
  )
}
