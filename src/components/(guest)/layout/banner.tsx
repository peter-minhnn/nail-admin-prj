import { ReactNode, useCallback, useState } from 'react'
import { cn } from '@/lib/utils.ts'
import { useIsMobile } from '@/hooks/use-mobile.tsx'

type BannerProps = {
  path?: string
  pathMobile?: string
  children?: ReactNode
  placeholder?: string
}

const useImageLoading = () => {
  const [isLoaded, setIsLoaded] = useState(true)

  const handleImageLoaded = () => {
    setIsLoaded(false)
  }

  return { isLoaded, handleImageLoaded }
}

export default function Banner(props: Readonly<BannerProps>) {
  const isMobile = useIsMobile()
  const { isLoaded, handleImageLoaded } = useImageLoading()

  const { placeholder = '', path, pathMobile } = props

  const handleGetImgSrc = useCallback(() => {
    if (isMobile && pathMobile) {
      return pathMobile
    }
    if (!isMobile && path) {
      return path
    }
    return ''
  }, [isMobile, props])

  return (
    <div className={cn(`banner relative z-[999] h-screen w-full`)}>
      <div className='relative h-full w-full'>
        {isLoaded && (
          <img
            src={placeholder}
            alt='Placeholder'
            className='absolute inset-0 -z-10 h-full w-full object-cover'
          />
        )}
        <img
          src={handleGetImgSrc()}
          alt='Banner'
          onLoad={handleImageLoaded}
          className='absolute inset-0 -z-10 h-full w-full object-cover'
        />
      </div>
      {props.children}
    </div>
  )
}
