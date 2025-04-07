import { ReactNode } from 'react'

type BannerProps = {
  path: string
  children?: ReactNode
}

export default function Banner(props: Readonly<BannerProps>) {
  return (
    <div
      className={`relative z-[999] h-[80vh] w-full bg-cover bg-center sm:h-screen`}
      style={{ backgroundImage: `url(${props.path})` }}
    >
      {props.children}
    </div>
  )
}
