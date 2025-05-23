import { useEffect, useState } from 'react'
import { pagePublicRouters } from '@/entities/(guest)'
import { PostPublicType } from '@/types/(guest)'
import get from 'lodash/get'
import { usePostsStore } from '@/stores/posts-store.ts'
import QuillEditor from '@/components/(admin)/quill-editor.tsx'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetPostDetail } from '../../../hooks/use-guest-queries.ts'

type PostDetailComponentProps = {
  slugId: string
}

export default function PostDetailComponent({
  slugId,
}: Readonly<PostDetailComponentProps>) {
  const { postsItem, setPostsItem } = usePostsStore()

  const [postDetail, setPostDetail] = useState<PostPublicType>()

  const { data, status, isRefetching } = useGetPostDetail(
    slugId ? Number(slugId) : postsItem?.id!
  )

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const result = get(data, ['data'])
    setPostDetail(result)
    setPostsItem(result)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [data, status, isRefetching])

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
