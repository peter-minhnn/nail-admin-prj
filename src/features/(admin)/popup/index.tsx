import { useEffect, useState } from 'react'
import {
  DialogType,
  ListResponseType,
  PaginationState,
  PopupFilterParams,
} from '@/types'
import { handleServerResponse } from '@/utils'
import get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { ConfirmDialog } from '@/components/(admin)/confirm-dialog.tsx'
import AdminPageContainer from '@/components/(admin)/layout/admin-page-container.tsx'
import { Main } from '@/components/(admin)/layout/main.tsx'
import {
  PopupButtons,
  PopupDataTable,
  PopupPreviewDialog,
} from '@/features/(admin)/popup/components'
import { useColumns } from '@/features/(admin)/popup/components/popup-columns.tsx'
import { PopupDialogAction } from '@/features/(admin)/popup/components/popup-dialog-action.tsx'
import {
  PopupDataType,
  popupListSchema,
} from '@/features/(admin)/popup/data/schema.ts'
import {
  useDeletePopup,
  useGetPopups,
} from '@/features/(admin)/popup/hooks/use-queries.ts'

const defaultPagination = {
  page: 1,
  take: 50,
}

export default function PopupComponent() {
  const intl = useIntl()
  const [open, setOpen] = useState<DialogType>('')
  const [dataSource, setDataSource] = useState<ListResponseType<PopupDataType>>(
    {
      data: [],
      meta: defaultPagination,
    }
  )
  const [currentRow, setCurrentRow] = useState<PopupDataType | null>(null)
  const [filterParams, setFilterParams] =
    useState<PopupFilterParams>(defaultPagination)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  })
  const [previewType, setPreviewType] = useState<'new' | 'saved'>('new')

  const onRefresh = async () => await refetch()

  const onAdd = () => setOpen('create')

  const onSuccess = async (response: any) => {
    handleServerResponse(response)
    if (response.type === 'success') {
      setOpen('')
      setCurrentRow(null)
      await refetch().finally()
    }
  }

  const onError = (error: Error) => {
    console.log(error)
    toast.error('common.messages.errorOccurred')
  }

  const columns = useColumns({
    setOpen,
    setCurrentRow,
    setPreviewType,
  })

  const { data, refetch, status, isRefetching } = useGetPopups(filterParams)

  const { mutateAsync: deletePopup } = useDeletePopup({
    onSuccess,
    onError,
  })

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const meta = get(data, ['meta'], {
      page: 1,
      take: 10,
    })
    setDataSource({ data: popupListSchema.parse(list), meta })
  }, [data, status, isRefetching])

  useEffect(() => {
    setFilterParams((prev) => ({
      ...prev,
      page: pagination.pageIndex + 1,
      take: pagination.pageSize,
    }))
  }, [pagination])

  return (
    <Main>
      <AdminPageContainer title='Popup Page'>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              <FormattedMessage id='popup.header.title' />
            </h2>
            <p className='text-muted-foreground'>
              <FormattedMessage id='popup.header.description' />
            </p>
          </div>
          <PopupButtons onRefresh={onRefresh} onAdd={onAdd} />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <PopupDataTable
            columns={columns}
            data={dataSource.data}
            languagePrefix='popup'
            setFilterParams={setFilterParams}
            pagination={{
              pageIndex: filterParams.page - 1,
              pageSize: filterParams.take,
            }}
            rowCount={dataSource.meta.itemCount ?? 0}
            loading={status === 'pending' || isRefetching}
            onPaginationChange={setPagination}
          />
        </div>
        {open === 'create' && (
          <PopupDialogAction
            open={open === 'create'}
            type='create'
            title='popup.createDialog.title'
            description='popup.createDialog.description'
            setOpen={setOpen}
            intl={intl}
          />
        )}
        {open === 'update' && (
          <PopupDialogAction
            open={open === 'update'}
            type='update'
            title='popup.editDialog.title'
            description='popup.editDialog.description'
            setOpen={setOpen}
            intl={intl}
            currentRow={currentRow}
          />
        )}
        {open === 'preview' && currentRow && (
          <PopupPreviewDialog
            currentRow={currentRow}
            onClose={() => setOpen('')}
            previewType={previewType}
            files={[]}
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
            handleConfirm={async () => await deletePopup(currentRow.id!)}
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
