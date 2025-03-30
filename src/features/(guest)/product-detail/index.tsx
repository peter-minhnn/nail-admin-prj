import { useEffect, useState } from 'react'
import { GuestProductDetailType } from '@/entities/(guest)/product'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import { Container } from '@/components/(guest)/layout/container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
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
      canonical='/'
      image={''}
    >
      <Container fixedHeader>
        <div className='relative z-[9999] h-[100px] w-full bg-[#EFE5D2] bg-cover bg-center'>
          <Navbar />
        </div>
        <div className='min-h-[100px]items-center grid justify-items-center bg-[#F2F1ED]'>
          <div
            className='min-h-screen w-screen'
            dangerouslySetInnerHTML={{ __html: postDetail?.description ?? '' }}
          />
        </div>
      </Container>
    </PageContainer>
  )
}
