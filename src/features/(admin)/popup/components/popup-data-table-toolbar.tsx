import { Dispatch, SetStateAction } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { PopupFilterParams } from '@/types'
import { FormattedMessage } from 'react-intl'
import { DataTableViewOptions } from '@/components/(admin)/tables'
import { Button } from '@/components/(admin)/ui/button.tsx'
import { PopupDataTableFilters } from '@/features/(admin)/popup/components'
import { PopupTypeOptions } from '@/features/(admin)/popup/data/data.ts'

interface PopupDataTableToolbarProps<TData> {
  table: Table<TData>
  languagePrefix: string
  setFilterParams: Dispatch<SetStateAction<PopupFilterParams>>
}

export function PopupDataTableToolbar<TData>({
  table,
  languagePrefix,
  setFilterParams,
}: Readonly<PopupDataTableToolbarProps<TData>>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <div className='flex gap-x-2'>
          {table.getColumn('type') && (
            <PopupDataTableFilters
              column={table.getColumn('type')}
              title='popup.type'
              options={PopupTypeOptions}
              setFilterParams={setFilterParams}
              optionKey='type'
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => {
              table.resetColumnFilters()
              setFilterParams((prev) => ({
                ...prev,
                postType: undefined,
                content: '',
              }))
            }}
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
