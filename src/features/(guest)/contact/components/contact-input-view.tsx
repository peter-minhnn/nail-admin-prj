import * as React from 'react'
import { cn } from '@/lib/utils.ts'

export interface ContactInputProps extends React.ComponentProps<'input'> {
  errorMessage?: string | string[]
  hasError?: boolean
}

const ContactInputView = React.forwardRef<HTMLInputElement, ContactInputProps>(
  ({ className, type, errorMessage, hasError, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-1'>
        <input
          type={type}
          className={cn(
            'w-full border-b-2 border-gray-300 bg-transparent p-2 outline-none focus:border-orange-500',
            {
              [className as string]: className,
              'border-red-500': errorMessage ?? hasError,
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
ContactInputView.displayName = 'Input'

export { ContactInputView }
