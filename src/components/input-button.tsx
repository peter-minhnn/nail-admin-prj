import { forwardRef } from 'react'
import { Slottable } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { Button, ButtonIconProps, ButtonProps } from '@/components/ui/button'

const InputButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonIconProps & { hasError?: boolean }
>(({ hasError, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type='button'
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent bg-white px-3 py-1 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        {
          'border border-red-500': hasError,
        }
      )}
      {...props}
    >
      <Slottable>{props.children}</Slottable>
    </Button>
  )
})

InputButton.displayName = 'InputButton'
export default InputButton
