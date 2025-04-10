import { useEffect, useState } from 'react'
import { pagePublicRouters } from '@/entities/(guest)'
import { LocalStorageKeys } from '@/entities/languages'
import { LocalStorageStateType } from '@/types'
import { PostPublicType } from '@/types/(guest)'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import ReactQuill from 'react-quill-new'
import { usePostsStore } from '@/stores/posts-store.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetPostDetail } from '../hook/use-guest-queries'

type PostDetailComponentProps = {
  slugId: string
}

export default function PostDetailComponent({
  slugId,
}: Readonly<PostDetailComponentProps>) {
  const intl = useIntl()
  const [postDetail, setPostDetail] = useState<PostPublicType>()
  const { postsItem, setPostsItem } = usePostsStore()
  const { data, status, isRefetching } = useGetPostDetail(postsItem?.id!)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const result = get(data, ['data'])
    setPostDetail(result)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [data, status, isRefetching])

  useEffect(() => {
    const item = localStorage.getItem(LocalStorageKeys.POST)
    if (!item) return

    const data = JSON.parse(item) as LocalStorageStateType<{
      postsItem: PostPublicType
    }>
    setPostsItem(data.state.postsItem)
  }, [])

  return (
    <PageContainer
      title={intl.formatMessage({ id: 'guest.common.service' })}
      description={intl.formatMessage({ id: 'guest.common.service' })}
      canonical={`${pagePublicRouters.postDetail}/${slugId}`}
      image={''}
    >
      <Container fixedHeader>
        <div className='custom-quill min-h-screen w-full bg-[#F2F1ED]'>
          <ReactQuill value={postDetail?.content ?? ''} readOnly />
        </div>
      </Container>
    </PageContainer>
  )
}
