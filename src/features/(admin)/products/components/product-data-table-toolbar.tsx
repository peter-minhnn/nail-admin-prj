import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { ProductFilterParams } from '@/types'
import { FormattedMessage, useIntl } from 'react-intl'
import useDebounceInput from '@/hooks/use-debounce-input.tsx'
import { DataTableViewOptions } from '@/components/(admin)/tables'
import { Button } from '@/components/(admin)/ui/button.tsx'
import { Input } from '@/components/(admin)/ui/input.tsx'
import { ProductDataTableFilters } from '@/features/(admin)/products/components/product-data-table-filters.tsx'

interface ProductDataTableToolbarProps<TData> {
  table: Table<TData>
  languagePrefix: string
  setFilterParams: Dispatch<SetStateAction<ProductFilterParams>>
  productTypeOptions: { label: string; value: string }[]
}

export function ProductDataTableToolbar<TData>({
  table,
  languagePrefix,
  setFilterParams,
  productTypeOptions,
}: Readonly<ProductDataTableToolbarProps<TData>>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const intl = useIntl()
  const [searchValue, setSearchValue] = useState<string>('')
  const inputSearch = useDebounceInput(searchValue, 300)

  useEffect(() => {
    setFilterParams((prev) => ({ ...prev, content: inputSearch }))
  }, [inputSearch])

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder={intl.formatMessage({
            id: 'common.searchFilterPlaceholder',
          })}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('productType') && (
            <ProductDataTableFilters
              column={table.getColumn('productType')}
              title='products.productType'
              options={productTypeOptions}
              setFilterParams={setFilterParams}
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
