import { useEffect, useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { DialogType, ListResponseType } from '@/types'
import { handleServerResponse } from '@/utils'
import get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { ConfirmDialog } from '@/components/(admin)/confirm-dialog.tsx'
import { DataTable } from '@/components/(admin)/tables'
import { ProductTypeButtons } from '@/features/(admin)/products/components/product-type/product-type-buttons.tsx'
import { useProductTypeColumns } from '@/features/(admin)/products/components/product-type/product-type-columns.tsx'
import { ProductTypeDetailDialog } from '@/features/(admin)/products/components/product-type/product-type-dialog-action.tsx'
import {
  ProductTypeData,
  productTypeListSchema,
} from '@/features/(admin)/products/data/schema.ts'
import {
  useDeleteProductType,
  useGetProductTypes,
} from '@/features/(admin)/products/hooks/use-queries.ts'

const defaultPagination = {
  page: 1,
  take: 50,
}

export default function ProductTypeList() {
  const intl = useIntl()
  const [open, setOpen] = useState<DialogType>('')
  const [dataSource, setDataSource] = useState<
    ListResponseType<ProductTypeData>
  >({
    data: [],
    meta: defaultPagination,
  })
  const [currentRow, setCurrentRow] = useState<ProductTypeData | null>(null)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  })
  const { data, refetch, status, isRefetching } = useGetProductTypes(pagination)

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

  const { mutateAsync } = useDeleteProductType({
    onSuccess,
    onError,
  })

  const columns = useProductTypeColumns({ setOpen, setCurrentRow })

  const onRefresh = () => {
    refetch().finally()
  }

  const onAdd = () => {
    setOpen('create')
  }

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const meta = get(data, ['meta'], {
      page: 1,
      take: 10,
    })
    setDataSource({ data: productTypeListSchema.parse(list), meta })
  }, [data, status, isRefetching])

  return (
    <>
      <div className='mb-2 flex flex-wrap items-center justify-end space-y-2'>
        <ProductTypeButtons onRefresh={onRefresh} onAdd={onAdd} />
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable
          columns={columns}
          data={dataSource.data}
          pagination={pagination}
          rowCount={dataSource.meta.itemCount ?? 0}
          languagePrefix='products'
          loading={status === 'pending' || isRefetching}
          onPaginationChange={setPagination}
          suppressShowToolbar
        />
      </div>
      {open === 'create' && (
        <ProductTypeDetailDialog
          open={open === 'create'}
          setOpen={setOpen}
          intl={intl}
          title='products.dialogAddTitle'
          type='create'
          description='products.dialogAddDescription'
          maxOrder={dataSource.data.length ? Number(dataSource.data[0].id) : 0}
        />
      )}
      {open === 'update' && (
        <ProductTypeDetailDialog
          open={open === 'update'}
          setOpen={setOpen}
          intl={intl}
          title='products.dialogEditTitle'
          type='update'
          description='products.dialogEditDescription'
          currentRow={currentRow}
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
    </>
  )
}
