import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { menuRoutes } from '@/entities/(guest)'
import { ListResponseType, PostsFilterParams } from '@/types'
import { PostPublicType } from '@/types/(guest)'
import get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'
import { useGetPosts } from '@/hooks/use-guest-queries.ts'
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
  if ((dataSource.data ?? []).length == 0) return null
  return (
    <div className='h-fit grid-cols-1 grid-rows-2 gap-8 py-32 pt-0 sm:grid md:grid-cols-2 md:py-32'>
      <div className='flex flex-row items-start justify-between pb-7 sm:flex-col sm:items-start sm:justify-start md:pb-24 md:pt-0'>
        <p
          className={`philosopher-regular text-start text-5xl sm:mb-16 sm:text-7xl`}
        >
          {intl.formatMessage({
            id: 'homeGuest.activity',
          })}
        </p>
        <div className='roboto-regular flex w-full items-start justify-end md:justify-start'>
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
