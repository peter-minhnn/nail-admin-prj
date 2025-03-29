import { Dispatch, SetStateAction } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DialogType, CommonSelectType } from '@/types'
import { FormattedMessage } from 'react-intl'
import { cn } from '@/lib/utils.ts'
import LongText from '@/components/(admin)/long-text.tsx'
import {
  DataTableColumnHeader,
  DataTableRowActions,
} from '@/components/(admin)/tables'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@/components/(admin)/ui'
import { ProductData, productSchema } from '../data/schema.ts'

type ProductColumnsProps = {
  setOpen: Dispatch<SetStateAction<DialogType>>
  setCurrentRow?: Dispatch<SetStateAction<ProductData | null>>
  handleShowContent?: (locale: 'vi' | 'en') => void
  productTypeOptions: CommonSelectType[]
}

export const useColumns = ({
  setOpen,
  setCurrentRow,
  handleShowContent,
  productTypeOptions,
}: ProductColumnsProps): ColumnDef<ProductData>[] => {
  return [
    {
      id: 'sortOrder',
      accessorKey: 'sortOrder',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='products.sortOrder'
          className='w-max min-w-fit'
        />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96 text-center'>
          {row.getValue('sortOrder')}
        </LongText>
      ),
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
      enableHiding: true,
    },
    {
      id: 'thumbnail',
      accessorKey: 'thumbnail',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='products.thumbnail'
          className='w-max min-w-fit'
        />
      ),
      cell: ({ row }) => (
        <Avatar className='m-auto lg:h-16 lg:w-16'>
          <AvatarImage
            src={row.getValue('thumbnail')}
            alt={row.original.productNameVi ?? ''}
          />
          <AvatarFallback>
            <img src='/images/placeholder.png' alt='' />
          </AvatarFallback>
        </Avatar>
      ),
      enableHiding: true,
      enableSorting: false,
    },
    {
      id: 'productNameVi',
      accessorKey: 'productNameVi',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='products.productNameVi' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>
          {row.getValue('productNameVi')}
        </LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'descriptionVi',
      accessorKey: 'descriptionVi',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='products.descriptionVi' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>
          {row.getValue('descriptionVi')}
        </LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'contentVi',
      accessorKey: 'contentVi',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='products.contentVi' />
      ),
      cell: ({ row }) => (
        <Button
          key={row.original.id}
          type='button'
          onClick={() => {
            setCurrentRow?.(productSchema.parse(row.original))
            handleShowContent?.('vi')
          }}
          className='link-button'
        >
          <FormattedMessage id='products.showContent' />
        </Button>
      ),
      enableHiding: true,
    },
    {
      id: 'productNameEn',
      accessorKey: 'productNameEn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='products.productNameEn' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>
          {row.getValue('productNameEn')}
        </LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'descriptionEn',
      accessorKey: 'descriptionEn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='products.descriptionEn' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>
          {row.getValue('descriptionEn')}
        </LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'contentEn',
      accessorKey: 'contentEn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='products.contentEn' />
      ),
      cell: ({ row }) => (
        <Button
          type='button'
          onClick={() => {
            setCurrentRow?.(productSchema.parse(row.original))
            handleShowContent?.('vi')
          }}
          className={cn('link-button', { hidden: !row.getValue('contentEn') })}
        >
          <FormattedMessage id='products.showContent' />
        </Button>
      ),
      enableHiding: true,
    },
    {
      accessorKey: 'productType',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='products.productType'
          className='w-max min-w-fit'
        />
      ),
      cell: ({ row }) => {
        const productType = row.getValue('productType')
        const type = productTypeOptions.find(
          (item) => Number(item.value) === productType
        )
        return (
          <LongText className='max-w-96 text-center'>{type?.label}</LongText>
        )
      },
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          schema={productSchema}
          setOpen={setOpen}
          setCurrentRow={setCurrentRow}
        />
      ),
    },
  ]
}
