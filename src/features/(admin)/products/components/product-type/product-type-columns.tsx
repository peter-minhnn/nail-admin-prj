import { Dispatch, SetStateAction } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DialogType } from '@/types'
import LongText from '@/components/(admin)/long-text.tsx'
import {
  DataTableColumnHeader,
  DataTableRowActions,
} from '@/components/(admin)/tables'
import { ProductTypeData } from '@/features/(admin)/products/data/schema.ts'
import { productTypeSchema } from '../../data/schema.ts'

type ProductTypeColumnsProps = {
  setOpen: Dispatch<SetStateAction<DialogType>>
  setCurrentRow?: Dispatch<SetStateAction<ProductTypeData | null>>
}

export const useProductTypeColumns = ({
  setOpen,
  setCurrentRow,
}: ProductTypeColumnsProps): ColumnDef<ProductTypeData>[] => {
  return [
    {
      id: 'nameVi',
      accessorKey: 'nameVi',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='products.nameVi' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>{row.getValue('nameVi')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'nameEn',
      accessorKey: 'nameEn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='products.nameEn' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>{row.getValue('nameEn')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'descVi',
      accessorKey: 'descVi',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='products.descVi' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>{row.getValue('descVi')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'descEn',
      accessorKey: 'descEn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='products.descEn' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>{row.getValue('descEn')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          schema={productTypeSchema}
          setOpen={setOpen}
          setCurrentRow={setCurrentRow}
        />
      ),
    },
  ]
}
