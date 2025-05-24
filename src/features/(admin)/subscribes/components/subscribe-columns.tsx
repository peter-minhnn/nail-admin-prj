import { ColumnDef } from '@tanstack/react-table'
import { SubscibesType } from '@/types/contact.type.ts'
import dayjs from 'dayjs'
import LongText from '@/components/(admin)/long-text.tsx'
import { DataTableColumnHeader } from '@/components/(admin)/tables'

export const useColumns = (): ColumnDef<SubscibesType>[] => {
  return [
    {
      id: 'email',
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='subscribe.email'
          className='text-center'
        />
      ),
      cell: ({ row }) =>
        row.getValue('email') && (
          <div className='flex justify-center'>
            <LongText className='max-w-96'>{row.getValue('email')}</LongText>
          </div>
        ),
      enableHiding: true,
      enableSorting: false,
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='subscribe.createdAt'
          className='text-center'
        />
      ),
      cell: ({ row }) =>
        row.getValue('createdAt') && (
          <span className='flex justify-center'>
            {dayjs(row.getValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        ),
      enableHiding: true,
      enableSorting: false,
    },
  ]
}
