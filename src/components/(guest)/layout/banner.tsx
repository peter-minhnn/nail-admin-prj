import { ReactNode, useCallback } from 'react'
import { cn } from '@/lib/utils.ts'
import { useIsMobile } from '@/hooks/use-mobile.tsx'

type BannerProps = {
  path?: string
  pathMobile?: string
  children?: ReactNode
}

export default function Banner(props: Readonly<BannerProps>) {
  const isMobile = useIsMobile()

  const useImageSrc = useCallback(() => {
    if (isMobile && props.pathMobile) {
      return props.pathMobile
    }
    if (!isMobile && props.path) {
      return props.path
    }
    return ''
  }, [isMobile, props])

  return (
    <div className={cn(`banner relative z-[999] h-screen w-full`)}>
      <img
        src={useImageSrc()}
        alt='Background'
        className={`pointer-events-none absolute inset-0 -z-10 h-full w-full select-none object-cover transition-opacity duration-500`}
      />
      {props.children}
    </div>
  )
}
