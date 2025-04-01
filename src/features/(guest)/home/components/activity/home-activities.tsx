import { useEffect, useState } from 'react'
import { menuRoutes } from '@/entities/(guest)'
import { PostPublicType } from '@/entities/(guest)/post'
import { ListResponseType, PostsFilterParams } from '@/types'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import Button from '@/components/(guest)/layout/button'
import { useGetPosts } from '@/features/(guest)/hook/use-guest-queries'
import HomeItemActivity from './home-item-activity'

export default function HomeActivities() {
  const [filterParams] = useState<PostsFilterParams>({
    postType: 'activity',
    page: 1,
    take: 10,
  })

  const [dataSource, setDataSource] = useState<
    ListResponseType<PostPublicType>
  >({
    data: [],
    meta: {
      page: 1,
      take: 50,
    },
  })
  const { data, status, isRefetching } = useGetPosts(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const meta = get(data, ['meta'], {
      page: 1,
      take: 10,
    })
    setDataSource({ data: list, meta })
  }, [data, status, isRefetching])

  const intl = useIntl()
  if ((dataSource.data ?? []).length == 0) return <div />
  return (
    <div className='mx-8 grid h-fit grid-cols-1 grid-rows-2 gap-8 pb-32 pt-16 md:mx-16 md:grid-cols-2'>
      <div className='flex flex-col items-start justify-start pb-[130px]'>
        <h3 className={`pb-[68px] text-[72px] font-normal`}>
          {intl.formatMessage({ id: 'guest.common.activity' })}
        </h3>
        <div className='flex h-full w-full items-end justify-start'>
          <a href={menuRoutes.activity}>
            <Button
              title={intl.formatMessage({
                id: 'guest.common.more',
              })}
            />
          </a>
        </div>
      </div>
      <HomeItemActivity item={dataSource.data[0]} className='w-full h-[240px]' />
      <HomeItemActivity item={dataSource.data[1]} className='w-full h-[240px]' />
      <div className='flex-row flex h-full gap-4'>
        <HomeItemActivity item={dataSource.data[2]} className=' w-full h-[240px]' />
        <HomeItemActivity item={dataSource.data[3]} className=' w-full h-[240px]' />
      </div>
    </div>
  )
}
