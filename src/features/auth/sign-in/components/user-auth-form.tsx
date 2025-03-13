import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormattedMessage, useIntl } from 'react-intl'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { useLogin } from '@/features/auth/sign-in/hooks/use-queries.ts'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  userName: z.string().min(1, { message: 'Please enter your username' }),
  password: z.string().min(1, {
    message: 'Please enter your password',
  }),
})

export function UserAuthForm({
  className,
  ...props
}: Readonly<UserAuthFormProps>) {
  const intl = useIntl()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  })

  const { mutateAsync, status } = useLogin()

  const onSubmit = async (data: z.infer<typeof formSchema>) =>
    await mutateAsync(data)

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='userName'
              render={({ field, formState: { errors } }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>
                    <FormattedMessage id='signIn.username' />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={intl.formatMessage({
                        id: 'signIn.userNamePlaceholder',
                      })}
                      hasError={!!errors.userName?.message}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field, formState: { errors } }) => (
                <FormItem className='space-y-1'>
                  <FormControl>
                    <PasswordInput
                      placeholder='********'
                      hasError={!!errors.password?.message}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='mt-2'
              disabled={status === 'pending'}
              type='submit'
            >
              <FormattedMessage id='signIn.title' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
