import { ReactNode } from 'react'

type PageContainerProps = Readonly<{
  title: string
  children: ReactNode
}>

export default function AdminPageContainer({
  title,
  children,
}: PageContainerProps) {
  return (
    <>
      <title>{`${title ? title + ' -' : ''} DEJAVU NAIL SPA ADMIN`}</title>
      {children}
    </>
  )
}
