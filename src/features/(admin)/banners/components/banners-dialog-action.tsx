import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { IconDeviceFloppy, IconX } from '@tabler/icons-react'
import { DialogType, ResultType } from '@/types/base.type.ts'
import { handleServerResponse } from '@/utils'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'
import { SelectDropdown } from '@/components/(admin)/select-dropdown.tsx'
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
import { BannersTypes } from '@/features/(admin)/banners/data/data.ts'
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
  fileMobile: '',
  fileNameMobile: '',
  filePathMobile: '',
  urlMobile: '',
}

export const BannersDialog: FC<BannersDialogsProps> = (props) => {
  const queryClient = useQueryClient()

  const form = useForm<BannersType>({
    resolver: zodResolver(bannersSchema),
    defaultValues: { ...defaultValues, type: 0 },
  })

  const intl = useIntl()
  const [files, setFiles] = useState<File[]>([])
  const [mobileFiles, setMobileFiles] = useState<File[]>([])

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
      type: data.type,
      file: files[0],
      fileMobile: mobileFiles?.length ? mobileFiles[0] : null,
    })
  }

  const handleClose = () => {
    props.setOpen('')
    form.reset()
  }

  return (
    <Dialog open={props.open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            <FormattedMessage id={props.title} />
          </DialogTitle>
          <DialogDescription>
            {props.description && <FormattedMessage id={props.description} />}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[32.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              id='banners-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-2 space-y-4 p-0.5'
            >
              <div className='flex h-24 w-full flex-col items-center gap-4 md:flex-row'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem className='h-full w-full'>
                      <FormLabel required>
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
                  name='type'
                  render={({ field }) => (
                    <FormItem className='h-full w-full'>
                      <FormLabel required>
                        <FormattedMessage id='banners.type' />
                      </FormLabel>
                      <SelectDropdown
                        className='h-10'
                        defaultValue={String(field.value ?? '')}
                        items={BannersTypes.map((v) => ({
                          value: String(v.value),
                          label: v.label,
                        }))}
                        onValueChange={(value) => field.onChange(Number(value))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='filePath'
                render={() => (
                  <FormItem className='w-full'>
                    <FormLabel required>
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
              <FormField
                control={form.control}
                name='filePathMobile'
                render={() => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      <FormattedMessage id='banners.mobileFile' />
                    </FormLabel>
                    <FileUpload
                      files={mobileFiles}
                      onValueChange={(files) => setMobileFiles(files ?? [])}
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
            type='button'
            form='banners-form'
            variant='outline'
            disabled={status === 'pending'}
            loading={status === 'pending'}
            onClick={handleClose}
          >
            <IconX size={18} />
            <FormattedMessage id='common.btnCancel' />
          </Button>
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
