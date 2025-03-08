import { Dispatch, SetStateAction } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DialogType } from '@/types/base.type.ts'
import { downloadImageFromLink } from '@/utils/common.ts'
import LongText from '@/components/long-text'
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header.tsx'
import { DataTableRowActions } from '@/components/tables/data-table-row-actions.tsx'
import { Button } from '@/components/ui'
import type { BannersType } from '../data/schema'
import { bannersSchema } from '../data/schema'

type BannersColumnsProps = {
  setOpen: Dispatch<SetStateAction<DialogType>>
  setCurrentRow?: Dispatch<SetStateAction<BannersType | null>>
}

export const useColumns = ({
  setOpen,
                             setCurrentRow
}: BannersColumnsProps): ColumnDef<BannersType>[] => {
  const handleOpenImageLink = async (imgLink: string) => {
    const domain = import.meta.env.VITE_BASE_API_URL
    await downloadImageFromLink(`${domain}/${imgLink}`, 'image')
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
      id: 'filePath',
      accessorKey: 'filePath',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='banners.filePath' />
      ),
      cell: ({ row }) => {
        return (
          <Button
            type='button'
            className='w-full cursor-pointer justify-start border-0 bg-transparent text-blue-500 shadow-none hover:bg-transparent hover:text-blue-400/90'
            onClick={() => handleOpenImageLink(row.getValue('filePath'))}
          >
            <LongText className='max-w-96'>{row.getValue('filePath')}</LongText>
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
