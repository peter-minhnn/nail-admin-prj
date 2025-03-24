import { useEffect, useState } from 'react'
import { FileType } from '@/types'
import { DialogType, ResultType } from '@/types/base.type.ts'
import { handleServerResponse } from '@/utils'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { ConfirmDialog } from '@/components/(admin)/confirm-dialog.tsx'
import AdminPageContainer from '@/components/(admin)/layout/admin-page-container.tsx'
import { Main } from '@/components/(admin)/layout/main.tsx'
import { DataTable } from '@/components/(admin)/tables'
import {
  AlbumsButtons,
  AlbumDetailDialog,
  useColumns,
  AlbumsGalleryDialog,
} from '@/features/(admin)/albums/components'
import {
  AlbumsDataType,
  albumsListSchema,
} from '@/features/(admin)/albums/data/schema.ts'
import {
  useDeleteAlbum,
  useGetAlbums,
} from '@/features/(admin)/albums/hooks/use-queries.ts'

export default function AlbumsComponent() {
  const [open, setOpen] = useState<DialogType>('')
  const [dataSource, setDataSource] = useState<AlbumsDataType[]>([])
  const [currentRow, setCurrentRow] = useState<AlbumsDataType | null>(null)
  const [images, setImages] = useState<FileType[]>([])
  const intl = useIntl()
  const { data, refetch, status, isRefetching } = useGetAlbums()

  const onRefresh = () => {
    refetch().finally()
  }

  const onAdd = () => {
    setOpen('create')
  }

  const onSuccess = async (response: ResultType) => {
    handleServerResponse(response)
    refetch().finally()
    setOpen('')
  }

  const onError = (error: Error) => {
    toast.error(error.message)
    setOpen('')
  }

  const handleOpenAlbums = (values: FileType[]) => {
    setOpen('carousel')
    setImages(values)
  }

  const columns = useColumns({ setOpen, setCurrentRow, handleOpenAlbums })

  const { mutateAsync } = useDeleteAlbum({ onSuccess, onError })

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    setDataSource(data ? albumsListSchema.parse(data) : [])
  }, [status, isRefetching, data])

  return (
    <Main>
      <AdminPageContainer
        title={intl.formatMessage({ id: 'albums.headerTitle' })}
      >
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              <FormattedMessage id='albums.headerTitle' />
            </h2>
            <p className='text-muted-foreground'>
              <FormattedMessage id='albums.description' />
            </p>
          </div>
          <AlbumsButtons onRefresh={onRefresh} onAdd={onAdd} />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            columns={columns}
            data={dataSource}
            languagePrefix='albums'
            loading={status === 'pending' || isRefetching}
          />
        </div>
        {open === 'create' && (
          <AlbumDetailDialog
            title='albums.dialogAddTitle'
            type='create'
            open={open === 'create'}
            setOpen={setOpen}
            description='albums.dialogAddDescription'
            intl={intl}
          />
        )}
        {open === 'update' && (
          <AlbumDetailDialog
            title='albums.dialogEditTitle'
            type='update'
            open={open === 'update'}
            setOpen={setOpen}
            description='albums.dialogEditDescription'
            currentRow={currentRow}
            intl={intl}
          />
        )}
        {open === 'carousel' && (
          <AlbumsGalleryDialog
            title='albums.dialogGalleryTitle'
            open={open === 'carousel'}
            setOpen={setOpen}
            description='albums.dialogGalleryDescription'
            images={images}
          />
        )}
        {open === 'delete' && currentRow && (
          <ConfirmDialog
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('')
              setCurrentRow(null)
            }}
            handleConfirm={async () => {
              await mutateAsync(currentRow.id!)
            }}
            className='max-w-md'
            title={
              <FormattedMessage
                id='common.messages.deleteConfirmSelected'
                values={{ deleteCount: 1 }}
              />
            }
            desc={
              <FormattedMessage
                id='albums.messages.deleteDescription'
                values={{
                  deleteId: <strong key={uuid()}>{currentRow.id!}</strong>,
                  br: <br key={uuid()} />,
                }}
              />
            }
            confirmText='Delete'
          />
        )}
      </AdminPageContainer>
    </Main>
  )
}
