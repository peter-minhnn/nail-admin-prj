import { ReactNode } from 'react'

type BannerProps = {
  path: string
  children?: ReactNode
}

export default function Banner(props: Readonly<BannerProps>) {
  return (
    <div
      className={`relative z-[9999] h-[80vh] sm:h-screen w-full bg-cover bg-center`}
      style={{ backgroundImage: `url(${props.path})` }}
    >
      {props.children}
    </div>
  )
}
