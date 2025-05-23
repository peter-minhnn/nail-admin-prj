import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Toaster } from 'sonner'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/(admin)/ui'
import { useSendSubscribe } from '../../../hooks/use-guest-queries.ts'
import { SubscribeInput } from './components/subscribe-input'
import SubscribeDataType, { subscribeSchema } from './data/shema'

export default function Subscribe() {
  const intl = useIntl()

  const defaultValues = {
    email: '',
  }

  const form = useForm<SubscribeDataType>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { ...defaultValues },
  })

  const onSuccess = async () => {
    form.reset()
    toast.success(
      'Cảm ơn bạn đã gửi thông tin đến DéJàVu. Chúng tôi sẽ liên lạc với bạn sớm.'
    )
  }

  const onError = () => {
    toast.success('onError!')
  }

  const { mutateAsync, status } = useSendSubscribe({ onSuccess, onError })

  const onSubmit = async (data: SubscribeDataType) => {
    await mutateAsync({
      email: data.email,
    })
  }

  return (
    <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
      <Toaster position='top-right' />
      <Form {...form}>
        <form
          id='contacts-form'
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex h-full w-full flex-col md:mr-4'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormControl>
                  <SubscribeInput
                    placeholder={intl.formatMessage({
                      id: 'subscribe.email.hint',
                    })}
                    autoComplete='off'
                    hasError={!!form.formState.errors?.email?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button
        type='submit'
        className='h-[50px] w-full md:w-[192px]'
        form='contacts-form'
        variant='save'
        disabled={status === 'pending'}
        loading={status === 'pending'}
      >
        <FormattedMessage id='subscribe.button' />
      </Button>
    </div>
  )
}
