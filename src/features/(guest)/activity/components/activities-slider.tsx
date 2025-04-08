import { useEffect, useState } from 'react'
import { PostsFilterParams } from '@/types'
import { PostPublicType } from '@/types/(guest)'
import get from 'lodash/get'
// Import Swiper styles
import { Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'
import { v4 as uuid } from 'uuid'
import { useGetPosts } from '@/features/(guest)/hook/use-guest-queries'
import ActivitiesGrid from './activity-grid'

export default function ActivitiesSlider() {
  const [filterParams] = useState<PostsFilterParams>({
    postType: 'activity',
    page: 1,
    take: 40,
  })

  const [activitiesGroup, setActivitiesGroup] = useState<PostPublicType[][]>([])
  const { data, status, isRefetching } = useGetPosts(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    setActivitiesGroup(splitList(list))
  }, [data, status, isRefetching])

  function splitList<T>(list: T[]): T[][] {
    const result: T[][] = []

    for (let i = 0; i < list.length; i += 6) {
      result.push(list.slice(i, i + 6))
    }

    return result
  }

  return (
    <div className='h-fit w-full'>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='mb-11 bg-transparent'
      >
        {activitiesGroup.map((item) => {
          return <ActivitiesGrid key={uuid()} items={item} />
        })}
      </Swiper>
    </div>
  )
}
