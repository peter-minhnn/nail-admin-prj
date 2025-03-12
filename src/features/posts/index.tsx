import { useEffect, useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { DialogType, ListResponseType, PostsFilterParams } from '@/types'
import { handleServerResponse } from '@/utils'
import get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { ConfirmDialog } from '@/components/confirm-dialog.tsx'
import { Main } from '@/components/layout/main.tsx'
import {
  useColumns,
  PostsButtons,
  PostsDetailDialog,
  PostsPreviewDialog,
  PostsDataTable,
} from '@/features/posts/components'
import { PostsDataType, postsListSchema } from '@/features/posts/data/schema.ts'
import {
  useDeletePost,
  useGetPosts,
} from '@/features/posts/hooks/use-queries.ts'

export default function PostsComponent() {
  const intl = useIntl()
  const [open, setOpen] = useState<DialogType>('')
  const [dataSource, setDataSource] = useState<ListResponseType<PostsDataType>>(
    {
      data: [],
      meta: {
        page: 1,
        take: 10,
      },
    }
  )
  const [currentRow, setCurrentRow] = useState<PostsDataType | null>(null)
  const [filterParams, setFilterParams] = useState<PostsFilterParams>({
    page: 1,
    take: 10,
  })

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [contentLocale, setContentLocale] = useState<'vi' | 'en'>('vi')

  const { data, refetch, status, isRefetching } = useGetPosts(filterParams)

  console.log('filterParams', filterParams)
  const { mutateAsync } = useDeletePost({
    onSuccess: async (response) => {
      handleServerResponse(response)
      if (response.type === 'success') {
        setOpen('')
        setCurrentRow(null)
        await refetch().finally()
      }
    },
    onError: (error) => {
      console.log(error)
      toast.error('common.messages.errorOccurred')
    },
  })

  const handleShowContent = (locale: 'vi' | 'en') => {
    setOpen('preview')
    setContentLocale(locale)
  }

  const columns = useColumns({ setOpen, setCurrentRow, handleShowContent })

  const onRefresh = () => {
    refetch().finally()
  }

  const onAdd = () => {
    setOpen('create')
  }

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const meta = get(data, ['meta'], {
      page: 1,
      take: 10,
    })
    setDataSource({ data: postsListSchema.parse(list), meta })
  }, [data, status, isRefetching])

  useEffect(() => {
    setFilterParams((prev) => ({
      ...prev,
      page: pagination.pageIndex + 1,
      take: pagination.pageSize,
    }))
  }, [pagination])

  return (
    <Main>
      <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            <FormattedMessage id='posts.headerTitle' />
          </h2>
          <p className='text-muted-foreground'>
            <FormattedMessage id='posts.headerDescription' />
          </p>
        </div>
        <PostsButtons onRefresh={onRefresh} onAdd={onAdd} />
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <PostsDataTable
          columns={columns}
          data={dataSource.data}
          pagination={{
            pageIndex: filterParams.page - 1,
            pageSize: filterParams.take,
          }}
          rowCount={dataSource.meta.itemCount ?? 0}
          languagePrefix='posts'
          loading={status === 'pending' || isRefetching}
          onPaginationChange={setPagination}
          setFilterParams={setFilterParams}
        />
      </div>
      {open === 'create' && (
        <PostsDetailDialog
          open={open === 'create'}
          setOpen={setOpen}
          intl={intl}
          title='posts.dialogAddTitle'
          type='create'
          description='posts.dialogAddDescription'
        />
      )}
      {open === 'update' && (
        <PostsDetailDialog
          open={open === 'update'}
          setOpen={setOpen}
          intl={intl}
          title='posts.dialogEditTitle'
          type='update'
          description='posts.dialogEditDescription'
          currentRow={currentRow}
        />
      )}
      {open === 'preview' && (
        <PostsPreviewDialog
          open={open === 'preview'}
          title='posts.dialogPreviewTitle'
          setOpen={setOpen}
          description='posts.dialogPreviewDescription'
          value={
            contentLocale === 'vi'
              ? currentRow?.contentVi
              : currentRow?.contentEn
          }
        />
      )}
      {open === 'delete' && currentRow && (
        <ConfirmDialog
          destructive
          open={open === 'delete'}
          onOpenChange={() => {
            setOpen('')
            setCurrentRow(null)
          }}
          handleConfirm={async () => {
            await mutateAsync(currentRow.id!)
          }}
          className='max-w-md'
          title={
            <FormattedMessage
              id='common.messages.deleteConfirmSelected'
              values={{ deleteCount: 1 }}
            />
          }
          desc={
            <FormattedMessage
              id='albums.messages.deleteDescription'
              values={{
                deleteId: <strong key={uuid()}>{currentRow.id!}</strong>,
                br: <br key={uuid()} />,
              }}
            />
          }
          confirmText='Delete'
        />
      )}
    </Main>
  )
}
