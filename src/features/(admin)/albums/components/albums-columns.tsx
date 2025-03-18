import { Dispatch, SetStateAction } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ActiveStatusList } from '@/entities/common-data.ts'
import { LocalStorageKeys } from '@/entities/languages'
import { FileType, DialogType } from '@/types'
import { LocaleStateType } from '@/types/lang.type.ts'
import { FormattedMessage } from 'react-intl'
import { v4 as uuid } from 'uuid'
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
import { albumsCallTypes } from '@/features/(admin)/albums/data/data.ts'
import { AlbumsDataType, albumsSchema } from '../data/schema.ts'

type AlbumsColumnsProps = {
  setOpen: Dispatch<SetStateAction<DialogType>>
  setCurrentRow?: Dispatch<SetStateAction<AlbumsDataType | null>>
  handleOpenAlbums?: (values: FileType[]) => void
}

export const useColumns = ({
  setOpen,
  setCurrentRow,
  handleOpenAlbums,
}: AlbumsColumnsProps): ColumnDef<AlbumsDataType>[] => {
  const handleSetThumbnailTitle = () => {
    const localeStorage = localStorage.getItem(LocalStorageKeys.LOCALE)
    if (!localeStorage) return 'thumbnailTitleVi'

    const intl = JSON.parse(localeStorage) as LocaleStateType
    if (intl.state.locale === 'vi') {
      return 'thumbnailTitleVi'
    }
    return 'thumbnailTitleEn'
  }

  return [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
      enableHiding: true,
    },
    {
      id: 'thumbnail',
      accessorKey: 'thumbnail',
      size: 250,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='albums.thumbnail'
          className='w-max min-w-fit'
        />
      ),
      cell: ({ row }) => (
        <Avatar key={uuid()} className='m-auto lg:h-16 lg:w-16'>
          <AvatarImage
            src={row.getValue('thumbnail')}
            alt={handleSetThumbnailTitle()}
          />
          <AvatarFallback key={uuid()}>
            <img src='/images/placeholder.png' alt='' />
          </AvatarFallback>
        </Avatar>
      ),
      enableHiding: true,
      enableSorting: false,
    },
    {
      id: 'thumbnailTitleVi',
      accessorKey: 'thumbnailTitleVi',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='albums.thumbnailTitleVi'
        />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-36'>
          {row.getValue('thumbnailTitleVi')}
        </LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'thumbnailTitleEn',
      accessorKey: 'thumbnailTitleEn',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='albums.thumbnailTitleEn'
        />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-36'>
          {row.getValue('thumbnailTitleEn')}
        </LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'nameVi',
      accessorKey: 'nameVi',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='albums.nameVi' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-36'>{row.getValue('nameVi')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'nameEn',
      accessorKey: 'nameEn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='albums.nameEn' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-36'>{row.getValue('nameEn')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'details',
      accessorKey: 'details',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='albums.details' />
      ),
      cell: ({ row }) => (
        <Button
          type='button'
          className='link-button'
          onClick={() => handleOpenAlbums?.(row.getValue('details'))}
        >
          <FormattedMessage id='albums.clickToViewAlbums' />
        </Button>
      ),
      enableHiding: true,
      enableSorting: false,
    },
    {
      accessorKey: 'isActive',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='albums.status'
          className='w-max min-w-fit'
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
          <div className='flex space-x-2'>
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
          schema={albumsSchema}
          setOpen={setOpen}
          setCurrentRow={setCurrentRow}
        />
      ),
    },
  ]
}
