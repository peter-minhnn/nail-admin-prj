import { useEffect, useState } from 'react'
import { ListResponseType, PaginationState, PopupFilterParams } from '@/types'
import { SubscibesType } from '@/types/contact.type.ts'
import get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'
import AdminPageContainer from '@/components/(admin)/layout/admin-page-container.tsx'
import { Main } from '@/components/(admin)/layout/main.tsx'
import { SubscribeButtons } from '@/features/(admin)/subscribes/components/subscribe-buttons.tsx'
import { useColumns } from '@/features/(admin)/subscribes/components/subscribe-columns.tsx'
import { SubscribeDataTable } from '@/features/(admin)/subscribes/components/subscribe-data-table.tsx'
import { useGetSubscribes } from '@/features/(admin)/subscribes/hooks/use-queries.ts'

const defaultPagination = {
  page: 1,
  take: 50,
}

export default function SubscribeComponent() {
  const { formatMessage } = useIntl()
  const [dataSource, setDataSource] = useState<ListResponseType<SubscibesType>>(
    {
      data: [],
      meta: defaultPagination,
    }
  )
  const [filterParams, setFilterParams] =
    useState<PopupFilterParams>(defaultPagination)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  })

  const onRefresh = async () => await refetch()

  const columns = useColumns()

  const { data, refetch, status, isRefetching } = useGetSubscribes(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const meta = get(data, ['meta'], {
      page: 1,
      take: 10,
    })
    setDataSource({ data: list, meta })
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
      <AdminPageContainer
        title={formatMessage({ id: 'subscribe.header.title' })}
      >
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              <FormattedMessage id='subscribe.header.title' />
            </h2>
            <p className='text-muted-foreground'>
              <FormattedMessage id='subscribe.header.description' />
            </p>
          </div>
          <SubscribeButtons onRefresh={onRefresh} />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <SubscribeDataTable
            columns={columns}
            data={dataSource.data}
            languagePrefix='subscribe'
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
      </AdminPageContainer>
    </Main>
  )
}
