
import { useGetPosts } from '@/features/(admin)/posts/hooks/use-guest-queries'
import { useEffect, useState, useRef } from 'react'
import { ListResponseType, PostsFilterParams } from '@/types'
import { PostDataType, postsListSchema } from '@/entities/(guest)/post'
import get from 'lodash/get'
import HomeItemActivity from './home_item_activity';
import Button from '@/components/(guest)/layout/button';
import { useIntl } from 'react-intl'

export default function HomeActivities() {
  const [filterParams] = useState<PostsFilterParams>({
    postType: "activity",
    page: 1,
    take: 10,
  })

  const [dataSource, setDataSource] = useState<ListResponseType<PostDataType>>(
    {
      data: [],
      meta: {
        page: 1,
        take: 50,
      },
    }
  )
  const { data, status, isRefetching } = useGetPosts(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const meta = get(data, ['meta'], {
      page: 1,
      take: 10,
    })
    setDataSource({ data: postsListSchema.parse(list), meta })
  }, [data, status, isRefetching])



  const intl = useIntl()
  if ((dataSource.data ?? []).length == 0) return <div />
  return (
    <div className="h-screen w-screen grid-cols-2 bg-[#F2F1ED] my-10">
      <div className="mx-16 grid h-screen grid-cols-2 grid-rows-2 gap-8 pb-32 pt-16">
        <div className="flex flex-col items-start justify-start pb-[130px]">
          <h3
            className={` pb-[68px] text-[72px] font-normal`}
          >
            Hoạt động
          </h3>
          <div className="flex h-full w-full items-end justify-start">
            <Button title={intl.formatMessage({
              id: 'homeGuest.more',
            })} />
          </div>
        </div>
        {renderAtIndex(0)}
        {renderAtIndex(1)}
        <div className="flex h-full w-full gap-4">
          {renderAtIndex(2)}
          {renderAtIndex(3)}
        </div>
      </div>
    </div>
  );

  function renderAtIndex(index: number) {
    var item = (dataSource.data ?? [])[index];
    if (item == null) return <div />;
    return <HomeItemActivity item={item} imgHeight="h-[240px]" />;
  }
}
