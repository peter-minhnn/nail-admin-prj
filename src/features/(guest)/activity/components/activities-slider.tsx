import { useEffect, useState } from 'react'
import { PostPublicType } from '@/entities/(guest)/post'
import { PostsFilterParams } from '@/types'
import get from 'lodash/get'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'
import { useGetPosts } from '@/features/(guest)/hook/use-guest-queries'
import ActivitesGrid from './activity-grid'

export default function ActivitiesSlider() {
  const [filterParams] = useState<PostsFilterParams>({
    postType: 'activity',
    page: 1,
    take: 40,
  })

  const [activitiesGroup, setActivitiesGroup] = useState<PostPublicType[][]>(
    []
  )
  const { data, status, isRefetching } = useGetPosts(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    setActivitiesGroup(splitList(list))
  }, [data, status, isRefetching])

  function splitList<T>(list: T[]): T[][] {
    let result: T[][] = []

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
        {activitiesGroup.map((item, index) => {
          return <ActivitesGrid key={index} items={item} />
        })}
      </Swiper>
    </div>
  )
}
