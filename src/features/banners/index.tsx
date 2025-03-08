import { useEffect, useState } from 'react'
import { DialogType, ResultType } from '@/types/base.type.ts'
import { FormattedMessage } from 'react-intl'
import { Main } from '@/components/layout/main.tsx'
import { DataTable } from '@/components/tables/data-table.tsx'
import {
  BannersButtons,
  useColumns,
  BannersDialog,
} from '@/features/banners/components'
import { BannersType } from '@/features/banners/data/schema.ts'
import { useDeleteBanners, useGetBanners } from '@/features/banners/hooks/use-queries.ts'
import { handleServerResponse } from '@/utils'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog.tsx'

export default function Banners() {
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
    setDataSource(data)
  }, [status, isRefetching])

  return (
    <Main>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            <FormattedMessage id="banners.headerTitle" />
          </h2>
          <p className="text-muted-foreground">
            <FormattedMessage id="banners.description" />
          </p>
        </div>
        <BannersButtons onRefresh={onRefresh} onAdd={onAdd} />
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={dataSource}
          languagePrefix="banners"
          loading={status === 'pending' || isRefetching}
        />
      </div>
      {open === 'create' && (
        <BannersDialog
          title="banners.dialogAddTitle"
          type="create"
          open={open === 'create'}
          setOpen={setOpen}
          description="banners.dialogAddDescription"
        />
      )}
      {open === 'delete' && currentRow && (
        <ConfirmDialog
          key="task-delete"
          destructive
          open={open === 'delete'}
          onOpenChange={() => {
            setOpen('')
            setCurrentRow(null)
          }}
          handleConfirm={async () => {
            await mutateAsync(currentRow.id!)
          }}
          className="max-w-md"
          title={<FormattedMessage id="common.messages.deleteConfirmSelected" values={{ deleteCount: 1 }} />}
          desc={
            <>
              You are about to delete a task with the ID{' '}
              <strong>{currentRow.id}</strong>. <br />
              This action cannot be undone.
            </>
          }
          confirmText="Delete"
        />
      )}
    </Main>
  )
}
