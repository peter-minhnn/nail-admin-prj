import { Button, ButtonIconProps, ButtonProps } from '@/components/ui/button';
import { forwardRef } from 'react';
import { Slottable } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const InputButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonIconProps & { hasError?: boolean }
>(({ hasError, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type="button"
      className={cn(
        'bg-white hover:bg-white flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        {
          'border border-red-500': hasError,
        }
      )}
      {...props}
    >
      <Slottable>{props.children}</Slottable>
    </Button>
  );
});

InputButton.displayName = 'InputButton';
export default InputButton;
