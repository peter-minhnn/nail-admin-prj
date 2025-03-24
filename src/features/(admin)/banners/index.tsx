import { useEffect, useState } from 'react'
import { DialogType, ResultType } from '@/types/base.type.ts'
import { handleServerResponse } from '@/utils'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { ConfirmDialog } from '@/components/(admin)/confirm-dialog.tsx'
import AdminPageContainer from '@/components/(admin)/layout/admin-page-container.tsx'
import { Main } from '@/components/(admin)/layout/main.tsx'
import { DataTable } from '@/components/(admin)/tables/data-table.tsx'
import {
  BannersButtons,
  useColumns,
  BannersDialog,
} from '@/features/(admin)/banners/components'
import {
  bannersListSchema,
  BannersType,
} from '@/features/(admin)/banners/data/schema.ts'
import {
  useDeleteBanners,
  useGetBanners,
} from '@/features/(admin)/banners/hooks/use-queries.ts'

export default function BannersComponent() {
  const intl = useIntl()
  const [open, setOpen] = useState<DialogType>('')
  const [dataSource, setDataSource] = useState<BannersType[]>([])
  const [currentRow, setCurrentRow] = useState<BannersType | null>(null)

  const { data, refetch, status, isRefetching } = useGetBanners()

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

  const columns = useColumns({ setOpen, setCurrentRow })

  const { mutateAsync } = useDeleteBanners({ onSuccess, onError })

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    setDataSource(bannersListSchema.parse(data))
  }, [status, isRefetching])

  return (
    <Main>
      <AdminPageContainer title={intl.formatMessage({ id: 'banners.title' })}>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              <FormattedMessage id='banners.headerTitle' />
            </h2>
            <p className='text-muted-foreground'>
              <FormattedMessage id='banners.description' />
            </p>
          </div>
          <BannersButtons onRefresh={onRefresh} onAdd={onAdd} />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            columns={columns}
            data={dataSource}
            languagePrefix='banners'
            loading={status === 'pending' || isRefetching}
          />
        </div>
        {open === 'create' && (
          <BannersDialog
            title='banners.dialogAddTitle'
            type='create'
            open={open === 'create'}
            setOpen={setOpen}
            description='banners.dialogAddDescription'
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
                id='banners.messages.deleteDescription'
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
