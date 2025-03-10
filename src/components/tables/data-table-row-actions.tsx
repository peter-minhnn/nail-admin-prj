import { Dispatch, SetStateAction } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconTrash } from '@tabler/icons-react'
import { DialogType } from '@/types/base.type.ts'
import { FormattedMessage } from 'react-intl'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  schema: any
  setCurrentRow?: Dispatch<SetStateAction<TData | null>>
  setOpen?: Dispatch<SetStateAction<DialogType>>
  suppressEditRow?: boolean
  suppressDeleteRow?: boolean
}

export function DataTableRowActions<TData>({
  row,
  schema,
  setCurrentRow,
  setOpen,
  suppressEditRow,
  suppressDeleteRow,
}: Readonly<DataTableRowActionsProps<TData>>) {
  const rowData = schema.parse(row.original)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        {!suppressEditRow && (
          <>
            <DropdownMenuItem
              onClick={() => {
                setCurrentRow?.(rowData)
                setOpen?.('update')
              }}
            >
              <FormattedMessage id='common.editBtn' />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {!suppressDeleteRow && (
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow?.(rowData)
              setOpen?.('delete')
            }}
            className='!text-red-500'
          >
            <FormattedMessage id='common.deleteBtn' />
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
