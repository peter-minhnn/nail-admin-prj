import { useEffect, useState } from 'react'
import get from 'lodash/get'
import { useGetPosts } from '@/features/(guest)/hook/use-guest-queries'
import ServicePostsTemplate from './service-posts-template'
import { PostsFilterParams } from '@/types/posts.type'
import { PostPublicType } from '@/entities/(guest)/post'

export default function ServicePostsSection() {

  const [filterParams] = useState<PostsFilterParams>({
    postType: 'service',
    page: 1,
    take: 50,
  })
  const [posts, setPost] = useState<PostPublicType[][]>([])
  const { data, status, isRefetching } = useGetPosts(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    setPost(splitList(list))
  }, [data, status, isRefetching])


  function splitList<T>(list: T[]): T[][] {
    let result: T[][] = []
    for (let i = 0; i < list.length; i += 6) {
      result.push(list.slice(i, i + 6))
    }
    return result
  }

  return (
    <div className='h-fit w-full flex flex-col gap-8'>
      {posts.map((e, index) => {
        return <ServicePostsTemplate items={e} hasLaber={index == 0} />
      })}
    </div>
  );
}
