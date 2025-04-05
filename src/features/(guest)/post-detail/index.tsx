import { useEffect, useState } from 'react'
import { PostPublicType } from '@/entities/(guest)/post'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import ReactQuill from 'react-quill-new'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetPostDetail } from '../hook/use-guest-queries'

type PostDetailComponentProps = {
  id: number
}

export default function PostDetailComponent({
  id,
}: Readonly<PostDetailComponentProps>) {
  const intl = useIntl()
  const [postDetail, setPostDetail] = useState<PostPublicType>()
  const { data, status, isRefetching } = useGetPostDetail(id)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const result = get(data, ['data'])
    setPostDetail(result)
  }, [data, status, isRefetching])

  return (
    <PageContainer
      title={intl.formatMessage({ id: 'guest.common.service' })}
      description={intl.formatMessage({ id: 'guest.common.service' })}
      canonical='/'
      image={''}
    >
      <Container fixedHeader>
        <div className='grid items-center justify-items-center bg-[#F2F1ED]'>
          <ReactQuill value={postDetail?.content ?? ''} readOnly />
        </div>
      </Container>
    </PageContainer>
  )
}
