import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { FormattedMessage } from 'react-intl'
import { Button } from '@/components/(admin)/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/(admin)/ui/dropdown-menu.tsx'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  languagePrefix: string
}

export function DataTableViewOptions<TData>({
  table,
  languagePrefix,
}: Readonly<DataTableViewOptionsProps<TData>>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto hidden h-8 lg:flex'
        >
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          <FormattedMessage id='common.tableFilterBtn' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-auto'>
        <DropdownMenuLabel>
          <FormattedMessage id='common.tableToggleColumns' />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='w-max break-all capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(value)}
              >
                <FormattedMessage id={`${languagePrefix}.${column.id}`} />
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
