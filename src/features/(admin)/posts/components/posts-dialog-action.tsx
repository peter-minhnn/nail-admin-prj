import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { IconCancel, IconDeviceFloppy } from '@tabler/icons-react'
import { DialogType, ResultType } from '@/types/base.type.ts'
import { handleServerResponse } from '@/utils'
import { FormattedMessage, IntlShape } from 'react-intl'
import { toast } from 'sonner'
import { cn } from '@/lib/utils.ts'
import { NumberInput } from '@/components/(admin)/number-input.tsx'
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
  Label,
  ScrollArea,
  Separator,
  Switch,
} from '@/components/(admin)/ui'
import FileUpload from '@/components/(admin)/upload.tsx'
import { PostsStatusList } from '@/features/(admin)/posts/data/data.ts'
import {
  PostsDataType,
  postsSchema,
} from '@/features/(admin)/posts/data/schema.ts'
import {
  usePostPosts,
  usePutPosts,
} from '@/features/(admin)/posts/hooks/use-queries.ts'

type CommonDialogsProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<DialogType>>
  title: string
  description?: string
  intl: IntlShape
}

type PostsAddDialogsProps = {
  type: 'create'
  maxOrder: number
} & CommonDialogsProps

type PostsEditDialogsProps = {
  type: 'update'
  currentRow: PostsDataType | null
} & CommonDialogsProps

type PostsDialogsProps = PostsAddDialogsProps | PostsEditDialogsProps

const defaultValues: PostsDataType = {
  thumbnail: '',
  titleVi: '',
  titleEn: '',
  contentVi: '',
  contentEn: '',
  postType: 'service',
  sortOrder: -1,
  isPublish: false,
  id: 0,
}

export const PostsDetailDialog: FC<PostsDialogsProps> = (props) => {
  const queryClient = useQueryClient()
  const isEdit = props.type === 'update' && !!props.currentRow

  const form = useForm<PostsDataType>({
    resolver: zodResolver(postsSchema),
    defaultValues: isEdit
      ? {
          ...props.currentRow,
        }
      : {
          ...defaultValues,
          sortOrder: props.type === 'create' ? props.maxOrder + 1 : 0,
        },
  })

  const [thumbnailFiles, setThumbnailFiles] = useState<File[]>([])
  const [showContentEn, setShowContentEn] = useState<boolean>(false)

  const onSuccess = async (response: ResultType) => {
    handleServerResponse(response)
    if (response.type === 'success') {
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
      props.setOpen('')
    }
  }

  const onError = (error: Error) => {
    console.log(error.message)
    toast.error('common.messages.errorOccurred')
  }

  const { mutateAsync, status } = usePostPosts({ onSuccess, onError })
  const { mutateAsync: updateMutateAsync, status: updateStatus } = usePutPosts({
    onSuccess,
    onError,
  })

  const loading = useMemo(
    () => status === 'pending' || updateStatus === 'pending',
    [status, updateStatus]
  )

  const validate = () => {
    let check = true
    if (!thumbnailFiles.length && !isEdit) {
      toast.error(
        props.intl.formatMessage({ id: 'posts.errors.thumbnailRequired' })
      )
      check = false
    }
    return check
  }

  const onSubmit = async (data: PostsDataType) => {
    if (!validate()) return
    if (!isEdit) {
      await mutateAsync({ ...data, thumbnail: thumbnailFiles[0] })
    } else {
      await updateMutateAsync({
        ...data,
        thumbnail: thumbnailFiles.length ? thumbnailFiles[0] : data.thumbnail,
      })
    }
  }

  return (
    <Dialog
      open={props.open}
      onOpenChange={() => {
        props.setOpen('')
        form.reset()
      }}
    >
      <DialogContent className='max-w-7xl'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            <FormattedMessage id={props.title} />
          </DialogTitle>
          <DialogDescription>
            {props.description && <FormattedMessage id={props.description} />}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[35.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              id='albums-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-2 space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='isPublish'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-col gap-2'>
                    <FormLabel>
                      <FormattedMessage id='posts.isPublish' />
                    </FormLabel>
                    <div className='flex w-full flex-row items-center gap-2'>
                      <FormControl>
                        <Switch
                          checked={field.value}
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
              <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
                <FormField
                  control={form.control}
                  name='thumbnail'
                  render={() => (
                    <FormItem className='w-full'>
                      <FormLabel required={!isEdit}>
                        <FormattedMessage id='posts.thumbnail' />
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          files={thumbnailFiles}
                          onValueChange={(files) =>
                            setThumbnailFiles(files ?? [])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex w-full flex-col gap-2'>
                  <FormField
                    control={form.control}
                    name='postType'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel required>
                          <FormattedMessage id='posts.postType' />
                        </FormLabel>
                        <SelectDropdown
                          defaultValue={field.value}
                          items={PostsStatusList}
                          onValueChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <NumberInput
                    form={form}
                    name='sortOrder'
                    label={props.intl.formatMessage({ id: 'posts.sortOrder' })}
                    namespace='ProductMessages'
                    placeholder={props.intl.formatMessage({
                      id: 'posts.sortOrderPlaceholder',
                    })}
                  />
                </div>
              </div>
              <Separator />
              <div className='flex flex-row items-center gap-2'>
                <Switch
                  checked={showContentEn}
                  onCheckedChange={(value) => setShowContentEn(value)}
                />
                <Label
                  onClick={() => setShowContentEn(!showContentEn)}
                  className='cursor-pointer'
                >
                  <FormattedMessage
                    id={
                      showContentEn
                        ? 'posts.showContentEn'
                        : 'posts.hideContentEn'
                    }
                  />
                </Label>
              </div>
              <div className='flex flex-col gap-3 md:flex-row md:justify-between'>
                <div
                  className={cn('flex w-1/2 flex-col gap-4', {
                    'w-full': !showContentEn,
                  })}
                >
                  <FormField
                    control={form.control}
                    name='titleVi'
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col', {
                          'w-full': !showContentEn,
                        })}
                      >
                        <FormLabel required>
                          <FormattedMessage id='posts.titleVi' />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={props.intl.formatMessage({
                              id: 'posts.titleViPlaceholder',
                            })}
                            className='w-full'
                            autoComplete='off'
                            hasError={!!form.formState.errors?.titleVi?.message}
                            autoFocus
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contentVi'
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col', {
                          'w-full': !showContentEn,
                        })}
                      >
                        <FormLabel required>
                          <FormattedMessage id='posts.contentVi' />
                        </FormLabel>
                        <FormControl>
                          <QuillEditor
                            onChange={field.onChange}
                            value={field.value}
                            placeholder={props.intl.formatMessage({
                              id: 'posts.contentViPlaceholder',
                            })}
                            hasError={
                              !!form.formState.errors?.contentVi?.message
                            }
                            helperText={
                              form.formState.errors?.contentVi?.message
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className={cn(
                    'mt-20 flex w-1/2 flex-col items-center gap-4 md:mt-0',
                    { hidden: !showContentEn }
                  )}
                >
                  <FormField
                    control={form.control}
                    name='titleEn'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel>
                          <FormattedMessage id='posts.titleEn' />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={props.intl.formatMessage({
                              id: 'posts.titleEnPlaceholder',
                            })}
                            className='w-full'
                            autoComplete='off'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contentEn'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>
                          <FormattedMessage id='posts.contentEn' />
                        </FormLabel>
                        <FormControl>
                          <QuillEditor
                            onChange={field.onChange}
                            value={field.value}
                            placeholder={props.intl.formatMessage({
                              id: 'posts.contentEnPlaceholder',
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
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
            form='albums-form'
            variant='save'
            disabled={loading}
            loading={loading}
          >
            <IconDeviceFloppy size={18} />
            <FormattedMessage id='common.btnSaveChanges' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
