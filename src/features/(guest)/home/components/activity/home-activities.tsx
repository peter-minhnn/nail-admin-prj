import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { menuRoutes } from '@/entities/(guest)'
import { ListResponseType, PostsFilterParams } from '@/types'
import { PostPublicType } from '@/types/(guest)'
import get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'
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
    <div className='grid h-fit grid-cols-1 grid-rows-2 gap-8  pt-0 py-32 md:py-32 md:grid-cols-2 '>
      <div className='flex flex-col items-start justify-start pb-5  pt-24 md:pt-0 md:pb-24'>
        <h3 className={`font-philosopher pb-[68px] text-start text-7xl  font-normal`}>
          {intl.formatMessage({ id: 'guest.common.activity' })}
        </h3>
        <div className='flex h-full w-full items-end justify-start'>
          <Link
            to={menuRoutes.activity}
            onClick={() => window.scrollTo(0, 0)}
            className='home-btn'
          >
            <FormattedMessage id='guest.common.more' />
          </Link>
        </div>
      </div>
      <HomeItemActivity
        item={dataSource.data[0]}
        className='h-[240px] w-full'
      />
      <HomeItemActivity
        item={dataSource.data[1]}
        className='h-[240px] w-full'
      />
      <div className='flex flex-col gap-4 md:flex-row'>
        <HomeItemActivity
          item={dataSource.data[2]}
          className='h-[240px] w-full'
        />
        <HomeItemActivity
          item={dataSource.data[3]}
          className='h-[240px] w-full'
        />
      </div>
    </div>
  )
}
