import { useEffect, useState } from 'react'
import { PostPublicType } from '@/entities/(guest)/post'
import { PostsFilterParams } from '@/types/posts.type'
import get from 'lodash/get'
import { v4 as uuid } from 'uuid'
import { useGetPosts } from '@/features/(guest)/hook/use-guest-queries'
import ServicePostsTemplate from './service-posts-template'

export default function ServicePostsSection() {
  const [filterParams] = useState<PostsFilterParams>({
    postType: 'service',
    page: 1,
    take: 50,
  })
  const [posts, setPosts] = useState<PostPublicType[][]>([])
  const { data, status, isRefetching } = useGetPosts(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    setPosts(splitList(list))
  }, [data, status, isRefetching])

  function splitList<T>(list: T[]): T[][] {
    const result: T[][] = []
    for (let i = 0; i < list.length; i += 6) {
      result.push(list.slice(i, i + 6))
    }
    return result
  }

  return (
    <div className='flex h-fit w-full flex-col gap-8'>
      {posts.map((e, index) => {
        return (
          <ServicePostsTemplate items={e} hasLabel={index == 0} key={uuid()} />
        )
      })}
    </div>
  )
}
