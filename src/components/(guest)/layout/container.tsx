import React, { ReactElement, useMemo } from 'react'
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
      <div className={""}>
        {children}
        <Footer />
      </div>
    </>
  )
}
