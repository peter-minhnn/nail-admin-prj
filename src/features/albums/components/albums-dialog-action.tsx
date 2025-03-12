import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { IconCancel, IconDeviceFloppy } from '@tabler/icons-react'
import { DialogType, ResultType } from '@/types/base.type.ts'
import { handleServerResponse } from '@/utils'
import get from 'lodash/get'
import { FormattedMessage, IntlShape } from 'react-intl'
import { toast } from 'sonner'
import { DataTable } from '@/components/tables'
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
  Separator,
} from '@/components/ui'
import FileUpload from '@/components/upload.tsx'
import { useAlbumsDetailColumns } from '@/features/albums/components/index.ts'
import {
  AlbumsDataType,
  AlbumsDetailDataType,
  albumsSchema,
} from '@/features/albums/data/schema.ts'
import {
  usePostAlbums,
  usePutAlbums,
} from '@/features/albums/hooks/use-queries.ts'

type CommonDialogsProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<DialogType>>
  title: string
  description?: string
  intl: IntlShape
}

type AlbumsAddDialogsProps = {
  type: 'create'
} & CommonDialogsProps

type AlbumsEditDialogsProps = {
  type: 'update'
  currentRow: AlbumsDataType | null
} & CommonDialogsProps

type AlbumsDialogsProps = AlbumsAddDialogsProps | AlbumsEditDialogsProps

const defaultValues: AlbumsDataType = {
  thumbnail: null,
  thumbnailTitleVi: '',
  thumbnailTitleEn: '',
  nameVi: '',
  nameEn: '',
  isActive: true,
  details: [],
}

export const AlbumDetailDialog: FC<AlbumsDialogsProps> = (props) => {
  const queryClient = useQueryClient()
  const isEdit = props.type === 'update' && !!props.currentRow

  const form = useForm<AlbumsDataType>({
    resolver: zodResolver(albumsSchema),
    defaultValues: isEdit
      ? {
          ...props.currentRow,
        }
      : defaultValues,
  })

  const [thumbnailFiles, setThumbnailFiles] = useState<File[]>([])
  const [albumFiles, setAlbumFiles] = useState<File[]>([])
  const [currentAlbumRow, setCurrentAlbumRow] =
    useState<AlbumsDetailDataType | null>(null)
  const [albums, setAlbums] = useState<AlbumsDetailDataType[]>(
    isEdit ? get(props, ['currentRow', 'details'], []) : []
  )
  const [deleteAlbumIds, setDeleteAlbumIds] = useState<number[]>([])

  const onSuccess = async (response: ResultType) => {
    handleServerResponse(response)
    await queryClient.invalidateQueries({ queryKey: ['albums'] })
    props.setOpen('')
  }

  const onError = () => {
    props.setOpen('')
  }

  const { mutateAsync, status } = usePostAlbums({ onSuccess, onError })
  const { mutateAsync: updateMutateAsync, status: updateStatus } = usePutAlbums(
    { onSuccess, onError }
  )

  const albumsDetailColumns = useAlbumsDetailColumns({
    intl: props.intl,
    setCurrentRow: setCurrentAlbumRow,
  })

  const validate = () => {
    let check = true
    if (!thumbnailFiles.length && !isEdit) {
      toast.error(
        props.intl.formatMessage({ id: 'albums.errors.thumbnailRequired' })
      )
      check = false
    }
    if (!albumFiles.length && !isEdit) {
      toast.error(
        props.intl.formatMessage({ id: 'albums.errors.detailsRequired' })
      )
      check = false
    }
    return check
  }

  const onSubmit = async (data: AlbumsDataType) => {
    if (!validate()) return

    const obj = { ...data, albumType: '0' }

    if (!isEdit) {
      await mutateAsync({
        ...obj,
        thumbnail: thumbnailFiles[0],
        files: albumFiles,
      })
    } else {
      await updateMutateAsync({
        ...obj,
        thumbnail: thumbnailFiles.length ? thumbnailFiles[0] : null,
        files: albumFiles,
        deleteDetailIds: deleteAlbumIds,
      })
    }
  }

  useEffect(() => {
    if (currentAlbumRow) {
      setDeleteAlbumIds((prev) => [...prev, currentAlbumRow.id!])
      setAlbums((prev) => [...prev.filter((v) => v.id !== currentAlbumRow.id)])
    }
    return () => setCurrentAlbumRow(null)
  }, [currentAlbumRow])

  return (
    <Dialog
      open={props.open}
      onOpenChange={() => {
        props.setOpen('')
        form.reset()
      }}
    >
      <DialogContent className='max-w-lg md:min-w-[50rem]'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            <FormattedMessage id={props.title} />
          </DialogTitle>
          <DialogDescription>
            {props.description && <FormattedMessage id={props.description} />}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[40.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              id='albums-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-3 space-y-4 p-0.5'
            >
              <p className='text-lg font-semibold'>
                <FormattedMessage id='albums.thumbnail' />
              </p>
              <div className='flex flex-row items-center gap-4'>
                <FormField
                  control={form.control}
                  name='thumbnailTitleVi'
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col'>
                      <FormLabel required>
                        <FormattedMessage id='albums.thumbnailTitleVi' />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={props.intl.formatMessage({
                            id: 'albums.thumbnailTitleViPlaceholder',
                          })}
                          className='w-full'
                          autoComplete='off'
                          hasError={
                            !!form.formState.errors?.thumbnailTitleVi?.message
                          }
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
                  name='thumbnailTitleEn'
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col'>
                      <FormLabel>
                        <FormattedMessage id='albums.thumbnailTitleEn' />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={props.intl.formatMessage({
                            id: 'albums.thumbnailTitleEnPlaceholder',
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
              </div>
              <FormField
                control={form.control}
                name='thumbnail'
                render={() => (
                  <FormItem className='flex w-full flex-col'>
                    <FormLabel required={!isEdit}>
                      <FormattedMessage id='albums.thumbnail' />
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
              <Separator />
              <p className='text-lg font-semibold'>
                <FormattedMessage id='albums.details' />
              </p>
              <div className='flex flex-row items-center gap-4'>
                <FormField
                  control={form.control}
                  name='nameVi'
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col'>
                      <FormLabel required>
                        <FormattedMessage id='albums.nameVi' />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={props.intl.formatMessage({
                            id: 'albums.nameViPlaceholder',
                          })}
                          className='w-full'
                          autoComplete='off'
                          hasError={!!form.formState.errors?.nameVi?.message}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='nameEn'
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col'>
                      <FormLabel>
                        <FormattedMessage id='albums.nameEn' />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={props.intl.formatMessage({
                            id: 'albums.nameEnPlaceholder',
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
              </div>
              <FormField
                control={form.control}
                name='details'
                render={() => (
                  <FormItem className='flex w-full flex-col'>
                    <FormLabel required={!isEdit}>
                      <FormattedMessage id='albums.details' />
                    </FormLabel>
                    <FormControl>
                      <FileUpload
                        files={albumFiles}
                        onValueChange={(files) => setAlbumFiles(files ?? [])}
                        dropZoneConfigs={{
                          maxFiles: 100,
                          multiple: true,
                          maxSize: 5 * 1024 * 1024,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isEdit && (
                <>
                  <p className='font-normal'>
                    <FormattedMessage id='albums.imageList' />
                  </p>
                  <div className='max-w-[27.7rem] flex-1 overflow-auto md:max-w-[45.78rem] lg:flex-row lg:space-y-0'>
                    <DataTable
                      columns={albumsDetailColumns}
                      data={albums}
                      languagePrefix='albums'
                      suppressShowToolbar
                      loading={false}
                    />
                  </div>
                </>
              )}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => props.setOpen('')}
            disabled={status === 'pending' || updateStatus === 'pending'}
            loading={status === 'pending' || updateStatus === 'pending'}
          >
            <IconCancel size={18} />
            <FormattedMessage id='common.btnCancel' />
          </Button>
          <Button
            type='submit'
            form='albums-form'
            variant='save'
            disabled={status === 'pending' || updateStatus === 'pending'}
            loading={status === 'pending' || updateStatus === 'pending'}
          >
            <IconDeviceFloppy size={18} />
            <FormattedMessage id='common.btnSaveChanges' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
