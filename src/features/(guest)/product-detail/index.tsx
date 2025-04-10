import { useEffect, useState } from 'react'
import { pagePublicRouters } from '@/entities/(guest)'
import { LocalStorageKeys } from '@/entities/languages'
import { LocalStorageStateType } from '@/types'
import { GuestProductDetailType } from '@/types/(guest)'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import ReactQuill from 'react-quill-new'
import { useProductStore } from '@/stores/product-store.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetProductDetail } from '../hook/use-guest-queries'

type ProductDetailComponentProps = {
  slugId: string
}

export default function ProductDetailComponent({
  slugId,
}: Readonly<ProductDetailComponentProps>) {
  const intl = useIntl()
  const [postDetail, setPostDetail] = useState<GuestProductDetailType>()
  const { product, setProductItem } = useProductStore()
  const { data, status, isRefetching } = useGetProductDetail(product?.id!)

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
    const productItem = localStorage.getItem(LocalStorageKeys.PRODUCT)
    if (!productItem) return

    const data = JSON.parse(productItem) as LocalStorageStateType<{
      product: GuestProductDetailType
    }>
    setProductItem(data.state.product)
  }, [])

  return (
    <PageContainer
      title={intl.formatMessage({ id: 'guest.common.service' })}
      description={intl.formatMessage({ id: 'guest.common.service' })}
      canonical={`${pagePublicRouters.productDetail}/${slugId}`}
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
