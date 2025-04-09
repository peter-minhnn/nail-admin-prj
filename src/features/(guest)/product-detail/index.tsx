import { useEffect, useState } from 'react'
import { pagePublicRouters } from '@/entities/(guest)'
import { GuestProductDetailType } from '@/types/(guest)'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import ReactQuill from 'react-quill-new'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetProductDetail } from '../hook/use-guest-queries'

type ProductDetailComponentProps = {
  id: number
}

export default function ProductDetailComponent({
  id,
}: Readonly<ProductDetailComponentProps>) {
  const intl = useIntl()
  const [postDetail, setPostDetail] = useState<GuestProductDetailType>()
  const { data, status, isRefetching } = useGetProductDetail(id) ///hard product id

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const result = get(data, ['data'])
    setPostDetail(result)
  }, [data, status, isRefetching])

  return (
    <PageContainer
      title={intl.formatMessage({ id: 'guest.common.service' })}
      description={intl.formatMessage({ id: 'guest.common.service' })}
      canonical={`${pagePublicRouters.productDetail}/${id}`}
      image={''}
    >
      <Container fixedHeader>
        <div className='custom-quill grid min-h-screen bg-[#F2F1ED]'>
          <ReactQuill value={postDetail?.content ?? ''} readOnly />
        </div>
      </Container>
    </PageContainer>
  )
}
