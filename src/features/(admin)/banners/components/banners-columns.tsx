import { Dispatch, SetStateAction } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DialogType } from '@/types/base.type.ts'
import LongText from '@/components/(admin)/long-text.tsx'
import { DataTableColumnHeader } from '@/components/(admin)/tables/data-table-column-header.tsx'
import { DataTableRowActions } from '@/components/(admin)/tables/data-table-row-actions.tsx'
import { Button } from '@/components/(admin)/ui'
import type { BannersType } from '../data/schema.ts'
import { bannersSchema } from '../data/schema.ts'

type BannersColumnsProps = {
  setOpen: Dispatch<SetStateAction<DialogType>>
  setCurrentRow?: Dispatch<SetStateAction<BannersType | null>>
}

export const useColumns = ({
  setOpen,
  setCurrentRow,
}: BannersColumnsProps): ColumnDef<BannersType>[] => {
  const handleOpenImageLink = async (imgLink: string) => {
    window.open(imgLink, '_blank')
  }

  return [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
      enableHiding: true,
    },
    {
      id: 'title',
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='banners.title' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-36'>{row.getValue('title')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'originalName',
      accessorKey: 'originalName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='banners.originalName' />
      ),
      cell: ({ row }) => {
        return (
          <Button
            type='button'
            className='w-full cursor-pointer justify-start border-0 bg-transparent text-blue-500 shadow-none hover:bg-transparent hover:text-blue-400/90'
            onClick={() => handleOpenImageLink(row.original.url)}
          >
            <LongText className='max-w-96'>
              {row.getValue('originalName')}
            </LongText>
          </Button>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          schema={bannersSchema}
          setOpen={setOpen}
          setCurrentRow={setCurrentRow}
          suppressEditRow
        />
      ),
    },
  ]
}
