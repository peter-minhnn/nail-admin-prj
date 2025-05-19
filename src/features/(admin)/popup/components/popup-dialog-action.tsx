import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import {
  IconArrowRight,
  IconCancel,
  IconDeviceFloppy,
} from '@tabler/icons-react'
import { DialogType, ResultType } from '@/types'
import { handleServerResponse } from '@/utils'
import { FormattedMessage, IntlShape } from 'react-intl'
import { toast } from 'sonner'
import { cn } from '@/lib/utils.ts'
import QuillEditor from '@/components/(admin)/quill-editor.tsx'
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
  Switch,
} from '@/components/(admin)/ui'
import FileUpload from '@/components/(admin)/upload.tsx'
import { PopupPreviewDialog } from '@/features/(admin)/popup/components/popup-preview-dialog.tsx'
import { PopupTypeOptions } from '@/features/(admin)/popup/data/data.ts'
import {
  PopupDataType,
  popupSchema,
} from '@/features/(admin)/popup/data/schema.ts'
import {
  usePostPopup,
  usePutPopup,
} from '@/features/(admin)/popup/hooks/use-queries.ts'
import '../data/editor.css'

type CommonDialogsProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<DialogType>>
  title: string
  description?: string
  intl: IntlShape
}

type PopupAddDialogsProps = {
  type: 'create'
} & CommonDialogsProps

type PopupEditDialogsProps = {
  type: 'update'
  currentRow: PopupDataType | null
} & CommonDialogsProps

type PopupDialogsProps = PopupAddDialogsProps | PopupEditDialogsProps

const defaultValues: PopupDataType = {
  id: 0,
  content: '',
  image: '',
  isPublished: false,
  title: '',
  type: 'image',
  url: '',
}

export const PopupDialogAction: FC<PopupDialogsProps> = (props) => {
  const { open, setOpen, title, description, intl } = props

  const queryClient = useQueryClient()
  const isEdit = props.type === 'update' && !!props.currentRow

  const form = useForm<PopupDataType>({
    resolver: zodResolver(popupSchema),
    defaultValues: isEdit
      ? {
          ...props.currentRow,
        }
      : {
          ...defaultValues,
        },
  })

  const [files, setFiles] = useState<File[]>([])
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [previewType, setPreviewType] = useState<'saved' | 'new'>('saved')

  const onOpenChange = () => {
    setOpen('')
    form.reset()
  }

  const onSubmit = async (data: PopupDataType) => {
    if (data.type === 'image' && !files.length) {
      data.image = null
    }

    if (!isEdit) {
      await createPopupAsync(data)
    } else {
      await updatePopupAsync(data)
    }
  }

  const onSuccess = async (response: ResultType) => {
    handleServerResponse(response)
    if (response.type === 'success') {
      await queryClient.invalidateQueries({
        queryKey: ['popup'],
        refetchType: 'all',
      })
      props.setOpen('')
    }
  }

  const onError = (error: Error) => {
    console.log(error.message)
    toast.error('common.messages.errorOccurred')
  }

  const { mutateAsync: createPopupAsync, status: createStatus } = usePostPopup({
    onSuccess,
    onError,
  })

  const { mutateAsync: updatePopupAsync, status: updateStatus } = usePutPopup({
    onSuccess,
    onError,
  })

  const loading = useMemo(
    () => [createStatus, updateStatus].includes('pending'),
    [createStatus, updateStatus]
  )

  const isShowPreviewButton = useMemo(() => {
    if (form.watch('type') === 'image') {
      return files.length > 0
    }
    if (form.watch('type') === 'content') {
      return form.watch('title') !== '' || form.watch('content') !== ''
    }
    return false
  }, [form.watch('type'), form.watch('title'), form.watch('content'), files])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-5xl'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            <FormattedMessage id={title} />
          </DialogTitle>
          <DialogDescription>
            {description && <FormattedMessage id={description} />}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[32.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              id='popup-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-2 space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='isPublished'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormLabel>
                      <FormattedMessage id='popup.isPublished' />
                    </FormLabel>
                    <div className='flex w-full flex-row items-center gap-2'>
                      <FormControl>
                        <Switch
                          checked={Boolean(field.value)}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        <FormattedMessage
                          id={field.value ? 'common.yes' : 'common.no'}
                        />
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <div className='flex w-full flex-col gap-2'>
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel required>
                        <FormattedMessage id='popup.type' />
                      </FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        items={PopupTypeOptions}
                        onValueChange={(value) => {
                          if (value === 'content') {
                            form.setValue('image', [])
                            form.setValue('url', '')
                          }
                          if (value === 'image') {
                            form.setValue('title', '')
                            form.setValue('content', '')
                          }
                          field.onChange(value)
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={cn('flex w-full flex-col gap-4', {
                  hidden: form.watch('type') !== 'image',
                })}
              >
                <FormField
                  control={form.control}
                  name='url'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel required={!isEdit}>
                        <FormattedMessage id='popup.url' />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className={cn('flex w-full', { hidden: !isEdit })}>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => {
                      setPreviewType('saved')
                      setPreviewModalOpen(true)
                    }}
                    className='group transition-all duration-300 group-hover:rotate-0'
                  >
                    <FormattedMessage id='popup.viewSavedImage' />
                    <IconArrowRight
                      size={18}
                      className='-rotate-45 transition-all duration-300 group-hover:rotate-0'
                    />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name='image'
                  render={() => (
                    <FormItem className='w-full'>
                      <FormLabel required={!isEdit}>
                        <FormattedMessage id='popup.image' />
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          files={files}
                          onValueChange={(files) => {
                            setFiles(files ?? [])
                            form.setValue('image', files ?? [])
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={cn('flex flex-col gap-3', {
                  hidden: form.watch('type') !== 'content',
                })}
              >
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel required>
                        <FormattedMessage id='popup.title' />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={intl.formatMessage({
                            id: 'popup.titlePlaceholder',
                          })}
                          className='w-full'
                          autoComplete='off'
                          hasError={!!form.formState.errors?.title?.message}
                          autoFocus
                          value={field.value ?? ''}
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
                    <FormItem className={cn('flex flex-col')}>
                      <FormLabel required>
                        <FormattedMessage id='popup.content' />
                      </FormLabel>
                      <FormControl>
                        <QuillEditor
                          onChange={field.onChange}
                          value={field.value as string}
                          placeholder={intl.formatMessage({
                            id: 'popup.contentPlaceholder',
                          })}
                          hasError={!!form.formState.errors?.content?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <div
            className={cn('my-4 flex w-full', { hidden: !isShowPreviewButton })}
          >
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                setPreviewModalOpen(true)
                setPreviewType('new')
              }}
              disabled={loading}
            >
              <IconDeviceFloppy size={18} />
              <FormattedMessage id='popup.previewButton' />
            </Button>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => props.setOpen('')}
            disabled={loading}
            loading={loading}
          >
            <IconCancel size={18} />
            <FormattedMessage id='common.btnCancel' />
          </Button>
          <Button
            type='submit'
            form='popup-form'
            variant='save'
            disabled={loading}
            loading={loading}
          >
            <IconDeviceFloppy size={18} />
            <FormattedMessage id='common.btnSaveChanges' />
          </Button>
        </DialogFooter>

        {/* Preview Modal */}
        {previewModalOpen && (
          <PopupPreviewDialog
            currentRow={form.watch()}
            onClose={() => setPreviewModalOpen(false)}
            previewType={previewType}
            files={files}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
