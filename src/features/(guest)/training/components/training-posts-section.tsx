import { useEffect, useState } from 'react'
import { PostsFilterParams } from '@/types'
import { PostPublicType } from '@/types/(guest)'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import { v4 as uuid } from 'uuid'
import { useGetPosts } from '@/features/(guest)/hook/use-guest-queries'
import TrainingPostTemplate from './training-post-template'

export default function TrainingPostsSection() {
  const [filterParams] = useState<PostsFilterParams>({
    postType: 'training',
    page: 1,
    take: 50,
  })

  const { data, status, isRefetching } = useGetPosts(filterParams)
  const [posts, setPosts] = useState<PostPublicType[][]>([])

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    setPosts(splitList(list))
  }, [data, status, isRefetching])

  function splitList<T>(list: T[]): T[][] {
    let result: T[][] = []
    for (let i = 0; i < list.length; i += 6) {
      result.push(list.slice(i, i + 6))
    }
    return result
  }

  const intl = useIntl()
  if (posts.length == 0) return null
  return (
    <div className='mb-6 h-fit w-full md:mb-64'>
      <div className='h-[291px] w-full items-center justify-center'>
        <div className='container relative mt-[200px] flex h-full w-full flex-col items-center p-0'>
          <p className={`philosopher-regular mb-7 text-center text-7xl`}>
            {intl.formatMessage({ id: 'training.industry' })}
          </p>
          <p className={`roboto-regular break-all text-center text-base`}>
            {intl.formatMessage({ id: 'training.industryDescription' })}
          </p>
          <img
            srcSet='/images/training_eclipse_orange.png'
            className='absolute -top-[12rem] left-0 h-[500px] w-full object-contain'
            alt=''
          />
        </div>
      </div>
      <div className='flex flex-col gap-8'>
        {posts.map((items) => {
          return <TrainingPostTemplate key={uuid()} items={items} />
        })}
      </div>
    </div>
  )
}
