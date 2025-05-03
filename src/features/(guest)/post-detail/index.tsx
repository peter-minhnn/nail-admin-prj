import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { pagePublicRouters } from '@/entities/(guest)'
import { LocalStorageKeys } from '@/entities/languages'
import { LocalStorageStateType } from '@/types'
import { PostPublicType } from '@/types/(guest)'
import get from 'lodash/get'
import { usePostsStore } from '@/stores/posts-store.ts'
import QuillEditor from '@/components/(admin)/quill-editor.tsx'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetPostDetail } from '../hook/use-guest-queries'

type PostDetailComponentProps = {
  slugId: string
}

export default function PostDetailComponent({
  slugId,
}: Readonly<PostDetailComponentProps>) {
  const { postsItem, setPostsItem } = usePostsStore()
  const navigate = useNavigate()

  const [postDetail, setPostDetail] = useState<PostPublicType>()

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
    if (!item) {
      navigate({ href: '/' }).finally()
      return
    }

    const data = JSON.parse(item) as LocalStorageStateType<{
      postsItem: PostPublicType
    }>
    setPostsItem(data.state.postsItem)
  }, [])

  return (
    <PageContainer
      title={postDetail?.title ?? ''}
      description={postDetail?.desc ?? ''}
      canonical={`${pagePublicRouters.postDetail}/${slugId}`}
      image={''}
    >
      <Container fixedHeader className='px-5 sm:px-8'>
        {postDetail?.title && (
          <div className='flex flex-col items-start justify-center'>
            <h1 className='text-center text-3xl font-bold text-[#2A2A2A]'>
              {postDetail?.title}
            </h1>
            {postDetail?.desc && (
              <p className='mt-2 text-sm text-[#7D7C7C]'>{postDetail.desc}</p>
            )}
          </div>
        )}
        <div className='custom-quill w-full bg-[#F2F1ED] pb-20 pt-10'>
          <QuillEditor
            value={postDetail?.content ?? ''}
            hideToolbar
            readOnly
            className='!p-0'
          />
        </div>
      </Container>
    </PageContainer>
  )
}
