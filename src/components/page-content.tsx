import { ReactElement, ReactNode } from 'react'


type PageHeaderProps = {
  title: string
  description: string | ReactElement
  children: ReactNode;
  headerChildren?: ReactNode;
}

export default function PageContent(props: Readonly<PageHeaderProps>) {
  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{props.title}</h2>
          <p className="text-muted-foreground">
            {props.description}
          </p>
        </div>
        {props.headerChildren}
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        {props.children}
      </div>
    </>
  )
}