import { ReactNode } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  children: ReactNode
  languagePrefix: string
  searchKey?: string
}

export function DataTableToolbar<TData>({
  table,
  children,
  languagePrefix,
  searchKey,
}: Readonly<DataTableToolbarProps<TData>>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const intl = useIntl()

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder={intl.formatMessage({
            id: 'common.searchFilterPlaceholder',
          })}
          value={
            searchKey
              ? ((table
                  .getColumn(searchKey ?? '')
                  ?.getFilterValue() as string) ?? '')
              : ''
          }
          onChange={(event) =>
            searchKey
              ? table
                  .getColumn(searchKey ?? '')
                  ?.setFilterValue(event.target.value)
              : null
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>{children}</div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            <FormattedMessage id='common.resetBtn' />
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} languagePrefix={languagePrefix} />
    </div>
  )
}
