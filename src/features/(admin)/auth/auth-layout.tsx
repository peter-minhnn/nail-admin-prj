import { ReactNode, useId } from 'react'

interface Props {
  children: ReactNode
}

export default function AuthLayout({ children }: Readonly<Props>) {
  return (
    <div
      className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'
      key={useId()}
      style={{
        backgroundImage: 'url(/images/bg_daotao.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <h1 className='text-4xl font-medium text-white'>DÉJÀ VU</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
