import { ReactNode, useEffect, useState } from 'react'

type BannerProps = {
  path?: string,
  pathMobile?: string,
  children?: ReactNode
}

export default function Banner(props: Readonly<BannerProps>) {
  const [src, setSrc] = useState(props.path);
  const updateSrc = () => {
    const width = window.innerWidth;
    if (width >= 640) {
      setSrc(props.path);
    } else {
      setSrc((props.pathMobile ?? "").length == 0 ? props.path : props.pathMobile!);
    }
  };
  useEffect(() => {
    updateSrc();
    window.addEventListener('resize', updateSrc);
    return () => window.removeEventListener('resize', updateSrc);
  })

  return (
    <div
      className={`relative z-[999] w-full bg-cover bg-center h-screen`}
      style={{ backgroundImage: `url(${src})` }}
    >
      {props.children}
    </div>
  )
}
