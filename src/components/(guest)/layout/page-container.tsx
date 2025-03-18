import { ReactNode, useLayoutEffect } from 'react'
import { useSeo } from '@/hooks/use-seo-context.tsx'
import { SeoProps } from '@/components/(guest)/layout/seo.tsx'

type PageContainerProps = {
  children: ReactNode
} & SeoProps

export default function PageContainer(props: Readonly<PageContainerProps>) {
  const context = useSeo()

  useLayoutEffect(() => {
    context.setSeo({
      title: props.title,
      description: props.description,
      image: props.image,
      schemaMarkup: props.schemaMarkup,
      canonical: props.canonical,
    })
  }, [props])

  return <>{props.children}</>
}
