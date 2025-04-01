import { useEffect, useState } from 'react'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import { useGetPosts } from '@/features/(guest)/hook/use-guest-queries'
import { PostPublicType } from '@/entities/(guest)/post'
import { PostsFilterParams } from '@/types'
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
    setPosts(splitList(list));
  }, [data, status, isRefetching])


  function splitList<T>(list: T[]): T[][] {
    let result: T[][] = []
    for (let i = 0; i < list.length; i += 6) {
      result.push(list.slice(i, i + 6))
    }
    return result
  }


  const intl = useIntl()
  if (posts.length == 0) return null;
  return (
    <div className='md:mb-64 mb-6 h-fit w-screen'>
      <div className='h-[591px] w-full items-center justify-center'>
        <div className='absolute mt-[200px] flex h-full w-full flex-col items-center md:px-20 px-6 lg:px-72'>
          <p className={`philosopher-regular mb-7 text-center text-7xl`}>
            {intl.formatMessage({ id: 'training.industry' })}
          </p>
          <p className={`roboto-regular text-center text-base break-all`}>
            {intl.formatMessage({ id: 'training.industryDescription' })}
          </p>
        </div>
        <img
          srcSet='/images/training_eclipse_orange.png'
          className='h-full w-full object-contain'
          alt=''
        />
      </div>
      <div className='flex-col flex gap-8'>
        {posts.map((items) => {
          return <TrainingPostTemplate items={items} />
        })}
      </div>
    </div>
  )
}
