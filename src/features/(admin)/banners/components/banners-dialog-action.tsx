import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { DialogType, ResultType } from '@/types/base.type.ts'
import { handleServerResponse } from '@/utils'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ScrollArea,
} from '@/components/(admin)/ui'
import FileUpload from '@/components/(admin)/upload.tsx'
import {
  bannersSchema,
  BannersType,
} from '@/features/(admin)/banners/data/schema.ts'
import { usePostBanners } from '@/features/(admin)/banners/hooks/use-queries.ts'

type CommonDialogsProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<DialogType>>
  title: string
  description?: string
}

type BannersAddDialogsProps = {
  type: 'create'
} & CommonDialogsProps

type BannersEditDialogsProps = {
  type: 'update'
  currentRow: BannersType | null
} & CommonDialogsProps

type BannersDialogsProps = BannersAddDialogsProps | BannersEditDialogsProps

const defaultValues = {
  title: '',
  file: '',
  fileName: '',
  filePath: '',
  url: '',
}

export const BannersDialog: FC<BannersDialogsProps> = (props) => {
  const queryClient = useQueryClient()

  const form = useForm<BannersType>({
    resolver: zodResolver(bannersSchema),
    defaultValues: defaultValues,
  })

  const intl = useIntl()
  const [files, setFiles] = useState<File[]>([])

  const onSuccess = async (response: ResultType) => {
    handleServerResponse(response)
    await queryClient.invalidateQueries({ queryKey: ['banners'] })
    props.setOpen('')
  }

  const onError = () => {
    props.setOpen('')
  }

  const { mutateAsync, status } = usePostBanners({ onSuccess, onError })

  const onSubmit = async (data: BannersType) => {
    if (!files.length) {
      toast.error(intl.formatMessage({ id: 'banners.errors.filePathRequired' }))
      return
    }
    await mutateAsync({
      title: data.title,
      file: files[0],
    })
  }

  return (
    <Dialog
      open={props.open}
      onOpenChange={() => {
        props.setOpen('')
        form.reset()
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            <FormattedMessage id={props.title} />
          </DialogTitle>
          <DialogDescription>
            {props.description && <FormattedMessage id={props.description} />}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[20.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              id='banners-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-3 space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col'>
                    <FormLabel>
                      <FormattedMessage id='banners.title' />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={intl.formatMessage({
                          id: 'banners.namePlaceholder',
                        })}
                        className='w-full'
                        autoComplete='off'
                        hasError={!!form.formState.errors?.title?.message}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='filePath'
                render={() => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      <FormattedMessage id='banners.filePath' />
                    </FormLabel>
                    <FileUpload
                      files={files}
                      onValueChange={(files) => setFiles(files ?? [])}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button
            type='submit'
            form='banners-form'
            variant='save'
            disabled={status === 'pending'}
            loading={status === 'pending'}
          >
            <IconDeviceFloppy size={18} />
            <FormattedMessage id='common.btnSaveChanges' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
