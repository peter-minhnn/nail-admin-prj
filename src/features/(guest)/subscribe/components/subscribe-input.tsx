import * as React from 'react'

export interface SubscribeInputProps extends React.ComponentProps<'input'> {
    errorMessage?: string | string[]
    hasError?: boolean
}

const SubscribeInput = React.forwardRef<HTMLInputElement, SubscribeInputProps>(
    ({ className, type, errorMessage, hasError, ...props }, ref) => {
        return (
            <div className='flex flex-col w-full'>
                <div className='relative flex-1 flex w-full'>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                    </div>

                    <input
                        id="input-group-1"
                        type='text'
                        className={`h-[50px] bg-transparent border-2  border-gray-400 text-sm outline-none rounded-md focus:border-orange-500 w-full ps-10 p-2.5 ${errorMessage ?? hasError ? "border-red-500" : ""}`}
                        ref={ref}
                        {...props}
                    />

                </div>
                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            </div>
        )
    }
)
SubscribeInput.displayName = 'Input'

export { SubscribeInput }


