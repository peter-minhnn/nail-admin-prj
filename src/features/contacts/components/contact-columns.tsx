import { ColumnDef } from '@tanstack/react-table'
import { ContactType } from '@/types'
import LongText from '@/components/long-text'
import { DataTableColumnHeader } from '@/components/tables'

export const useColumns = (): ColumnDef<ContactType>[] => {
  return [
    {
      id: 'firstName',
      accessorKey: 'firstName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='contacts.firstName' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96 text-center'>
          {row.getValue('firstName')}
        </LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'lastName',
      accessorKey: 'lastName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='contacts.lastName' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96 text-center'>
          {row.getValue('lastName')}
        </LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='contacts.email' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-60'>{row.getValue('email')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'phoneNumber',
      accessorKey: 'phoneNumber',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='contacts.phoneNumber' />
      ),
      cell: ({ row }) => (
        <span className='flex justify-center text-center'>
          {row.getValue('phoneNumber')}
        </span>
      ),
      enableHiding: true,
    },
    {
      id: 'subject',
      accessorKey: 'subject',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='contacts.subject' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>{row.getValue('subject')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'content',
      accessorKey: 'content',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='contacts.content' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>{row.getValue('content')}</LongText>
      ),
      enableHiding: true,
    },
  ]
}
