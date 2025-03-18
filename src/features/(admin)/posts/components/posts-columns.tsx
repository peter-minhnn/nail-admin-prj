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
  postsCallPublishTypes,
  postsCallTypes,
  PostsStatusList,
} from '@/features/(admin)/posts/data/data.ts'
import { PostsDataType, postsSchema } from '../data/schema.ts'

type PostsColumnsProps = {
  setOpen: Dispatch<SetStateAction<DialogType>>
  setCurrentRow?: Dispatch<SetStateAction<PostsDataType | null>>
  handleShowContent?: (locale: 'vi' | 'en') => void
}

export const useColumns = ({
  setOpen,
  setCurrentRow,
  handleShowContent,
}: PostsColumnsProps): ColumnDef<PostsDataType>[] => {
  return [
    {
      id: 'sortOrder',
      accessorKey: 'sortOrder',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='posts.sortOrder'
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
          title='posts.thumbnail'
          className='w-max min-w-fit'
        />
      ),
      cell: ({ row }) => (
        <Avatar className='m-auto lg:h-16 lg:w-16'>
          <AvatarImage
            src={row.getValue('thumbnail')}
            alt={row.original.titleVi ?? ''}
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
      id: 'titleVi',
      accessorKey: 'titleVi',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='posts.titleVi' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>{row.getValue('titleVi')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'titleEn',
      accessorKey: 'titleEn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='posts.titleEn' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-96'>{row.getValue('titleEn')}</LongText>
      ),
      enableHiding: true,
    },
    {
      id: 'contentVi',
      accessorKey: 'contentVi',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='posts.contentVi' />
      ),
      cell: ({ row }) => (
        <Button
          key={row.original.id}
          type='button'
          onClick={() => {
            setCurrentRow?.(postsSchema.parse(row.original))
            handleShowContent?.('vi')
          }}
          className='link-button'
        >
          <FormattedMessage id='posts.showContent' />
        </Button>
      ),
      enableHiding: true,
    },
    {
      id: 'contentEn',
      accessorKey: 'contentEn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='posts.contentEn' />
      ),
      cell: ({ row }) => (
        <Button
          type='button'
          onClick={() => {
            setCurrentRow?.(postsSchema.parse(row.original))
            handleShowContent?.('vi')
          }}
          className={cn('link-button', { hidden: !row.getValue('contentEn') })}
        >
          <FormattedMessage id='posts.showContent' />
        </Button>
      ),
      enableHiding: true,
    },
    {
      accessorKey: 'postType',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='posts.postType'
          className='w-max min-w-fit'
        />
      ),
      cell: ({ row }) => {
        const { postType } = row.original
        const badgeColor = postsCallTypes.get(postType)
        const name =
          PostsStatusList.find(
            (item) => item.value === row.getValue('postType')
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
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: 'isPublish',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title='posts.isPublish'
          className='w-max min-w-fit'
        />
      ),
      cell: ({ row }) => {
        const { isPublish } = row.original
        const badgeColor = postsCallPublishTypes.get(isPublish)
        const name =
          PublishStatusList.find(
            (item) => item.value === row.getValue('isPublish')
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
          schema={postsSchema}
          setOpen={setOpen}
          setCurrentRow={setCurrentRow}
        />
      ),
    },
  ]
}
