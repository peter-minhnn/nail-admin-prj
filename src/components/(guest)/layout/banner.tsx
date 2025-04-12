import { ReactNode, useMemo } from 'react'
import { cn } from '@/lib/utils.ts'
import { useIsMobile } from '@/hooks/use-mobile.tsx'

type BannerProps = {
  path?: string
  pathMobile?: string
  children?: ReactNode
}

export default function Banner(props: Readonly<BannerProps>) {
  const isMobile = useIsMobile()

  const useImageSrc = () =>
    useMemo(() => {
      if (isMobile && props.pathMobile) {
        return props.pathMobile
      }
      if (!isMobile && props.path) {
        return props.path
      }
      return '/images/placeholder.png'
    }, [isMobile, props])

  return (
    <div className={cn(`banner relative z-[999] h-screen w-full`)}>
      <img
        src={useImageSrc()}
        alt='Background'
        className='pointer-events-none absolute inset-0 -z-10 h-full w-full select-none object-cover'
      />
      {props.children}
    </div>
  )
}
