import { useEffect, useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { ContactFilterParams, ContactType, ListResponseType } from '@/types'
import get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'
import { Main } from '@/components/layout/main.tsx'
import { DataTable } from '@/components/tables'
import { ContactButtons, useColumns } from '@/features/contacts/components'
import {
  useContactsExport,
  useGetContacts,
} from '@/features/contacts/hooks/use-queries.ts'

export default function ContactsComponent() {
  const intl = useIntl()
  const [dataSource, setDataSource] = useState<ListResponseType<ContactType>>({
    data: [],
    meta: {
      page: 1,
      take: 50,
    },
  })
  const [filterParams, setFilterParams] = useState<ContactFilterParams>({
    page: 1,
    take: 50,
  })
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  })

  const { data, status, refetch, isRefetching } = useGetContacts(filterParams)

  const { mutateAsync: mutateExportAsync, status: exportStatus } =
    useContactsExport(intl)

  const columns = useColumns()

  const onExport = async () => {
    await mutateExportAsync({})
  }

  const onRefresh = () => {
    refetch().finally()
  }

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
      <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            <FormattedMessage id='contacts.headerTitle' />
          </h2>
          <p className='text-muted-foreground'>
            <FormattedMessage id='contacts.headerDescription' />
          </p>
        </div>
        <ContactButtons
          onRefresh={onRefresh}
          onExport={onExport}
          loading={exportStatus === 'pending'}
        />
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable
          columns={columns}
          data={dataSource.data ?? []}
          pagination={{
            pageIndex: filterParams.page - 1,
            pageSize: filterParams.take,
          }}
          rowCount={dataSource.meta.itemCount ?? 0}
          languagePrefix='contacts'
          loading={status === 'pending' || isRefetching}
          onPaginationChange={setPagination}
          suppressShowToolbar
        />
      </div>
    </Main>
  )
}
