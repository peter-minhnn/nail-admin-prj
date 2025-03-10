import { Dispatch, SetStateAction } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ActiveStatusList } from '@/entities/common-data.ts'
import get from 'lodash/get'
import { FormattedMessage, IntlShape } from 'react-intl'
import { toast } from 'sonner'
import { cn } from '@/lib/utils.ts'
import LongText from '@/components/long-text'
import { DataTableColumnHeader, DataTableRowActions } from '@/components/tables'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
} from '@/components/ui'
import { albumsCallTypes } from '@/features/albums/data/data.ts'
import { albumDetailSchema, AlbumsDetailDataType } from '../data/schema'

type AlbumDetailColumnsProps = {
  setCurrentRow?: Dispatch<SetStateAction<AlbumsDetailDataType | null>>
  intl: IntlShape
}

export const useAlbumsDetailColumns = ({
  intl,
  setCurrentRow,
}: AlbumDetailColumnsProps): ColumnDef<AlbumsDetailDataType>[] => {
  const handleOpenImageLink = async (imgLink: string) => {
    if (!imgLink) {
      toast.error(intl.formatMessage({ id: 'albums.noImageLink' }))
      return
    }
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
      id: 'url',
      accessorKey: 'url',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='albums.image'
          className='flex justify-center'
        />
      ),
      cell: ({ row }) => (
        <Avatar className='m-auto lg:h-16 lg:w-16'>
          <AvatarImage
            src={row.getValue('url')}
            alt={get(row, ['original', 'fileName'], '')}
          />
          <AvatarFallback>
            <img src='/images/placeholder.png' alt='' />
          </AvatarFallback>
        </Avatar>
      ),
      enableHiding: true,
    },
    {
      id: 'originalName',
      accessorKey: 'originalName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='albums.originalName' />
      ),
      cell: ({ row }) => (
        <Button
          className='w-full cursor-pointer justify-start border-0 bg-transparent text-blue-500 shadow-none hover:bg-transparent hover:text-blue-400/90'
          type='button'
          onClick={() => handleOpenImageLink(get(row, ['original', 'url'], ''))}
        >
          <LongText className='max-w-96'>
            {row.getValue('originalName')}
          </LongText>
        </Button>
      ),
      enableHiding: true,
    },
    {
      accessorKey: 'isActive',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='albums.status'
          className='flex justify-center'
        />
      ),
      cell: ({ row }) => {
        const { isActive } = row.original
        const badgeColor = albumsCallTypes.get(isActive)
        const name =
          ActiveStatusList.find(
            (item) => item.value === row.getValue('isActive')
          )?.label ?? ''
        return (
          <div className='flex justify-center space-x-2'>
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
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          schema={albumDetailSchema}
          setCurrentRow={setCurrentRow}
          suppressEditRow
        />
      ),
    },
  ]
}
