import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.ComponentProps<'input'> {
  errorMessage?: string | string[]
  hasError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, hasError, ...props }, ref) => {
    return (
      <div className='flex w-full flex-col gap-1'>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base !leading-10 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            {
              [className as string]: className,
              'border border-red-500': errorMessage ?? hasError,
            }
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
