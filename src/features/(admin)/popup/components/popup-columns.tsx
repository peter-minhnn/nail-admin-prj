import { Dispatch, SetStateAction } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PublishStatusList } from '@/entities/common-data.ts'
import { DialogType } from '@/types'
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
  Badge,
  Button,
} from '@/components/(admin)/ui'
import {
  PopupCallPublishTypes,
  PopupCallTypes,
  PopupTypeOptions,
} from '@/features/(admin)/popup/data/data.ts'
import { PopupDataType, popupSchema } from '../data/schema.ts'

type PopupColumnsProps = {
  setOpen: Dispatch<SetStateAction<DialogType>>
  setCurrentRow?: Dispatch<SetStateAction<PopupDataType | null>>
  setPreviewType?: Dispatch<SetStateAction<'new' | 'saved'>>
}

export const useColumns = ({
  setOpen,
  setCurrentRow,
  setPreviewType,
}: PopupColumnsProps): ColumnDef<PopupDataType>[] => {
  const handleViewContent = (row: PopupDataType) => {
    setPreviewType?.('saved')
    setCurrentRow?.(row)
    setOpen('preview')
  }

  return [
    {
      id: 'title',
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='popup.title'
          className='text-center'
        />
      ),
      cell: ({ row }) =>
        row.getValue('title') && (
          <LongText className='max-w-96'>{row.getValue('title')}</LongText>
        ),
      enableHiding: true,
      enableSorting: false,
    },
    {
      id: 'content',
      accessorKey: 'content',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='popup.content'
          className='text-center'
        />
      ),
      cell: ({ row }) =>
        row.getValue('content') && (
          <Button
            type='button'
            variant='link'
            className='w-full text-center text-blue-500'
            onClick={() => handleViewContent(row.original)}
          >
            <FormattedMessage id='popup.viewContent' />
          </Button>
        ),
      enableHiding: true,
      enableSorting: false,
    },
    {
      id: 'url',
      accessorKey: 'url',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='popup.url'
          className='text-center'
        />
      ),
      cell: ({ row }) =>
        row.getValue('url') && (
          <LongText className='w-max max-w-96'>{row.getValue('url')}</LongText>
        ),
      enableHiding: true,
      enableSorting: false,
    },
    {
      id: 'image',
      accessorKey: 'image',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='popup.image'
          className='text-center'
        />
      ),
      cell: ({ row }) =>
        row.getValue('image') && (
          <Avatar
            className='m-auto cursor-pointer lg:h-16 lg:w-16'
            onClick={() => handleViewContent(row.original)}
          >
            <AvatarImage
              src={row.getValue('image')}
              alt={row.original.url ?? ''}
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
      id: 'type',
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='popup.type'
          className='w-full min-w-fit text-center'
        />
      ),
      cell: ({ row }) => {
        const { type } = row.original
        const badgeColor = PopupCallTypes.get(type)
        const name =
          PopupTypeOptions.find((item) => item.value === row.getValue('type'))
            ?.label ?? ''
        return (
          <div className='flex items-center justify-center space-x-2'>
            {name && (
              <Badge
                variant='outline'
                className={cn('w-max capitalize', badgeColor)}
              >
                <FormattedMessage id={name} />
              </Badge>
            )}
          </div>
        )
      },
      enableHiding: true,
      enableSorting: false,
    },
    {
      id: 'isPublished',
      accessorKey: 'isPublished',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='popup.isPublished'
          className='min-w-14 text-center'
        />
      ),
      cell: ({ row }) => {
        const { isPublished } = row.original
        const badgeColor = PopupCallPublishTypes.get(isPublished)
        const name =
          PublishStatusList.find(
            (item) => item.value === row.getValue('isPublished')
          )?.label ?? ''
        return (
          <div className='flex items-center justify-center space-x-2'>
            {name && (
              <Badge
                variant='outline'
                className={cn('w-max capitalize', badgeColor)}
              >
                <FormattedMessage id={name} />
              </Badge>
            )}
          </div>
        )
      },
      enableHiding: true,
      enableSorting: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          schema={popupSchema}
          setOpen={setOpen}
          setCurrentRow={setCurrentRow}
        />
      ),
    },
  ]
}
