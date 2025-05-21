
import { FormattedMessage, useIntl } from "react-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SubscribeDataType, { subscribeSchema } from "./data/shema";
import { Button, Form, FormControl, FormField, FormItem, FormMessage } from "@/components/(admin)/ui";
import { SubscribeInput } from "./components/subscribe-input";
import { toast, Toaster } from 'sonner'
import { useSendSubscribe } from "../hook/use-guest-queries";

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
            'Cảm ơn bạn đã gửi thông tin đến Dejavu. Chúng tôi sẽ liên lạc với bạn sớm.'
        )
    }

    const onError = () => {
        toast.success('onError!')
    }

    const { mutateAsync, status } = useSendSubscribe({ onSuccess, onError })

    const onSubmit = async (data: SubscribeDataType) => {
        await mutateAsync({
            email: data.email
        })
    }


    return (<div className='flex md:flex-row flex-col mr-5 gap-4 md:gap-0'>
        <Toaster position='top-right' />
        <Form {...form}>
            <form id='contacts-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col w-full md:mr-4  h-full'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                            <FormControl>
                                <SubscribeInput placeholder={intl.formatMessage({
                                    id: 'subscribe.email.hint',
                                })}
                                    autoComplete='off'
                                    hasError={!!form.formState.errors?.email?.message}
                                    {...field} />
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
    </div>)
}
