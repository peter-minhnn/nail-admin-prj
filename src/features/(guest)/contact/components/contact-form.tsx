import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Toaster } from 'sonner'
import { Button } from '@/components/(admin)/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/(admin)/ui/form'
import {
  ContactDataType,
  contactsSchema,
} from '@/features/(guest)/contact/data/shema.ts'
import { useSendContact } from '../../hook/use-guest-queries'
import { ContactInputView } from './contact-input-view'

export default function ContactForm() {
  const defaultValues = {
    name: '',
    phone: '',
    email: '',
    address: '',
    topic: '',
    content: '',
  }

  const form = useForm<ContactDataType>({
    resolver: zodResolver(contactsSchema),
    defaultValues: { ...defaultValues },
  })

  const onSuccess = async () => {
    toast.success(
      'Cảm ơn bạn đã gửi thông tin đến Dejavu. Chúng tôi sẽ liên lạc với bạn sớm.'
    )
  }

  const onError = () => {
    toast.success('onError!')
  }

  const { mutateAsync, status } = useSendContact({ onSuccess, onError })

  const onSubmit = async (data: ContactDataType) => {
    await mutateAsync({
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      topic: data.topic,
      content: data.content,
    })
  }

  const intl = useIntl()
  return (
    <div className='w-full'>
      <Toaster position='top-right' />

      <Form {...form}>
        <form
          id='contacts-form'
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-3 space-y-4 p-0.5'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormControl>
                  <ContactInputView
                    placeholder={intl.formatMessage({
                      id: 'guest.contact.placeholderName',
                    })}
                    className='w-full border-b-2 border-gray-300 bg-transparent p-2 outline-none focus:border-orange-500'
                    autoComplete='off'
                    hasError={!!form.formState.errors?.name?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormControl>
                  <ContactInputView
                    placeholder={intl.formatMessage({
                      id: 'guest.contact.placeholderPhone',
                    })}
                    className='w-full border-b-2 border-gray-300 bg-transparent p-2 outline-none focus:border-orange-500'
                    autoComplete='off'
                    hasError={!!form.formState.errors?.phone?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormControl>
                  <ContactInputView
                    placeholder={intl.formatMessage({
                      id: 'guest.contact.placeholderEmail',
                    })}
                    className='w-full border-b-2 border-gray-300 bg-transparent p-2 outline-none focus:border-orange-500'
                    autoComplete='off'
                    hasError={!!form.formState.errors?.email?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormControl>
                  <ContactInputView
                    placeholder={intl.formatMessage({
                      id: 'guest.contact.placeholderAddress',
                    })}
                    className='w-full border-b-2 border-gray-300 bg-transparent p-2 outline-none focus:border-orange-500'
                    autoComplete='off'
                    hasError={!!form.formState.errors?.address?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='topic'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormControl>
                  <ContactInputView
                    placeholder={intl.formatMessage({
                      id: 'guest.contact.placeholderTopic',
                    })}
                    className='w-full border-b-2 border-gray-300 bg-transparent p-2 outline-none focus:border-orange-500'
                    autoComplete='off'
                    hasError={!!form.formState.errors?.topic?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormControl>
                  <ContactInputView
                    placeholder={intl.formatMessage({
                      id: 'guest.contact.placeholderContent',
                    })}
                    className='w-full border-b-2 border-gray-300 bg-transparent p-2 outline-none focus:border-orange-500'
                    autoComplete='off'
                    hasError={!!form.formState.errors?.content?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full items-end justify-end'>
            <Button
              type='submit'
              className='w-fit'
              form='contacts-form'
              variant='save'
              disabled={status === 'pending'}
              loading={status === 'pending'}
            >
              <FormattedMessage id='common.btnSaveChanges' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
