import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { PostsFilterParams } from '@/types'
import { FormattedMessage, useIntl } from 'react-intl'
import useDebounceInput from '@/hooks/use-debounce-input.tsx'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/tables'
import { PostsDataTableFilters } from '@/features/posts/components/posts-data-table-filters.tsx'
import { PostsStatusList } from '@/features/posts/data/data.ts'

interface PostsDataTableToolbarProps<TData> {
  table: Table<TData>
  languagePrefix: string
  setFilterParams: Dispatch<SetStateAction<PostsFilterParams>>
}

export function PostsDataTableToolbar<TData>({
  table,
  languagePrefix,
  setFilterParams,
}: Readonly<PostsDataTableToolbarProps<TData>>) {
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
          {table.getColumn('postType') && (
            <PostsDataTableFilters
              column={table.getColumn('postType')}
              title='posts.postType'
              options={PostsStatusList}
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
