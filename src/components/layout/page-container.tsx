import { ReactNode } from 'react'

type PageContainerProps = Readonly<{
  title: string
  children: ReactNode
}>

export function PageContainer({ title, children }: PageContainerProps) {
  return (
    <>
      <title>{title}</title>
      {children}
    </>
  )
}
