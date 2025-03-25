import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function AuthLayout({ children }: Readonly<Props>) {
  return (
    <div className='container h-screen flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
      <div className='mx-auto flex h-screen w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
        {children}
      </div>
    </div>
  )
}
