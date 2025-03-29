import { useEffect, useMemo, useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import {
  DialogType,
  ListResponseType,
  ProductFilterParams,
  ProductType,
  SortDataType,
} from '@/types'
import { handleServerResponse } from '@/utils'
import get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { ConfirmDialog } from '@/components/(admin)/confirm-dialog.tsx'
import {
  ProductDetailDialog,
  ProductPreviewDialog,
  useColumns,
  ProductButtons,
  ProductDataTable,
} from '@/features/(admin)/products/components'
import {
  ProductData,
  productListSchema,
} from '@/features/(admin)/products/data/schema.ts'
import {
  useDeleteProduct,
  useGetProducts,
  useGetProductTypes,
  usePutProduct,
} from '@/features/(admin)/products/hooks/use-queries.ts'

const defaultPagination = {
  page: 1,
  take: 50,
}

export default function ProductListComponent() {
  const intl = useIntl()
  const [open, setOpen] = useState<DialogType>('')
  const [dataSource, setDataSource] = useState<ListResponseType<ProductData>>({
    data: [],
    meta: defaultPagination,
  })
  const [currentRow, setCurrentRow] = useState<ProductData | null>(null)
  const [filterParams, setFilterParams] =
    useState<ProductFilterParams>(defaultPagination)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  })
  const [contentLocale, setContentLocale] = useState<'vi' | 'en'>('vi')
  const [sortData, setSortData] = useState<SortDataType<ProductData>>({
    isDragEnd: false,
    newRows: [],
  })
  const [productTypes, setProductTypes] = useState<ProductType[]>([])

  const { data, refetch, status, isRefetching } = useGetProducts(filterParams)

  const { data: productTypeData, status: productTypeStatus } =
    useGetProductTypes({
      pageIndex: 0,
      pageSize: 100,
    })

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

  const { mutateAsync } = useDeleteProduct({
    onSuccess,
    onError,
  })

  const { mutateAsync: updateMutateAsync } = usePutProduct({})

  const handleShowContent = (locale: 'vi' | 'en') => {
    setOpen('preview')
    setContentLocale(locale)
  }

  const memoizedProductTypes = useMemo(
    () => productTypes.map((v) => ({ label: v.nameVi, value: String(v.id) })),
    [productTypes]
  )

  const columns = useColumns({
    setOpen,
    setCurrentRow,
    handleShowContent,
    productTypeOptions: memoizedProductTypes,
  })

  const onRefresh = () => {
    refetch().finally()
  }

  const onAdd = () => {
    setOpen('create')
  }

  const handleUpdateSortData = async () => {
    const response = sortData.newRows.map(
      async (row) =>
        await updateMutateAsync({ ...row, price: Number(row.price) })
    )
    try {
      const result = await Promise.all(response)
      if (result.every((item) => item.type === 'success')) {
        toast.success(
          intl.formatMessage({ id: 'products.messages.updateSuccess' })
        )
        onRefresh()
      }
    } finally {
      setSortData({
        isDragEnd: false,
        newRows: [],
      })
    }
  }

  useEffect(() => {
    if (productTypeStatus === 'pending') return
    const list = get(productTypeData, ['list'], [])
    setProductTypes(list)
  }, [productTypeData, productTypeStatus])

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const meta = get(data, ['meta'], {
      page: 1,
      take: 10,
    })
    setDataSource({ data: productListSchema.parse(list), meta })
  }, [data, status, isRefetching])

  useEffect(() => {
    setFilterParams((prev) => ({
      ...prev,
      page: pagination.pageIndex + 1,
      take: pagination.pageSize,
    }))
  }, [pagination])

  useEffect(() => {
    if (!sortData.isDragEnd) return
    handleUpdateSortData().finally()

    return () =>
      setSortData({
        isDragEnd: false,
        newRows: [],
      })
  }, [sortData])

  return (
    <div className='w-full'>
      <div className='mb-2 flex flex-wrap items-center justify-end space-y-2'>
        <ProductButtons onRefresh={onRefresh} onAdd={onAdd} />
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <ProductDataTable
          columns={columns}
          data={dataSource.data}
          pagination={{
            pageIndex: filterParams.page - 1,
            pageSize: filterParams.take,
          }}
          rowCount={dataSource.meta.itemCount ?? 0}
          languagePrefix='products'
          loading={status === 'pending' || isRefetching}
          onPaginationChange={setPagination}
          setFilterParams={setFilterParams}
          setSortData={setSortData}
          productTypeOptions={memoizedProductTypes}
        />
      </div>
      {open === 'create' && (
        <ProductDetailDialog
          open={open === 'create'}
          setOpen={setOpen}
          intl={intl}
          title='products.dialogAddTitle'
          type='create'
          description='products.dialogAddDescription'
          maxOrder={dataSource.data.length ? Number(dataSource.data[0].id) : 0}
          productTypeOptions={memoizedProductTypes}
        />
      )}
      {open === 'update' && (
        <ProductDetailDialog
          open={open === 'update'}
          setOpen={setOpen}
          intl={intl}
          title='products.dialogEditTitle'
          type='update'
          description='products.dialogEditDescription'
          currentRow={currentRow}
          productTypeOptions={memoizedProductTypes}
        />
      )}
      {open === 'preview' && (
        <ProductPreviewDialog
          open={open === 'preview'}
          title='products.dialogPreviewTitle'
          setOpen={setOpen}
          value={
            contentLocale === 'vi'
              ? currentRow?.contentVi
              : currentRow?.contentEn
          }
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
    </div>
  )
}
