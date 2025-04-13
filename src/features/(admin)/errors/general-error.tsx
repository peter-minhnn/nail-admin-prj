import { HTMLAttributes } from 'react'
import { useLocation, useNavigate, useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/(admin)/ui/button.tsx'

interface GeneralErrorProps extends HTMLAttributes<HTMLDivElement> {
  minimal?: boolean
}

export default function GeneralError({
  className,
  minimal = false,
}: Readonly<GeneralErrorProps>) {
  const navigate = useNavigate()
  const { history } = useRouter()
  const { pathname } = useLocation()
  const isAdmin = pathname.includes('/admin')

  return (
    <div className={cn('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {!minimal && (
          <h1 className='text-[7rem] font-bold leading-tight'>500</h1>
        )}
        <span className='font-medium'>Oops! Something went wrong {`:')`}</span>
        <p className='text-center text-muted-foreground'>
          We apologize for the inconvenience. <br /> Please try again later.
        </p>
        {!minimal && (
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => history.go(-1)}>
              Go Back
            </Button>
            <Button onClick={() => navigate({ to: isAdmin ? '/admin' : '/' })}>
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
