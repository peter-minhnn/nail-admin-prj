import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { pagePublicRouters } from '@/entities/(guest)'
import { LocalStorageKeys } from '@/entities/languages'
import { LocalStorageStateType } from '@/types'
import { GuestProductDetailType } from '@/types/(guest)'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import { useProductStore } from '@/stores/product-store.ts'
import { addAltToImages } from '@/utils/common.ts'
import QuillEditor from '@/components/(admin)/quill-editor.tsx'
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
  const navigate = useNavigate()
  const { product, setProductItem } = useProductStore()

  const [productDetail, setProductDetail] = useState<GuestProductDetailType>()

  const { data, status, isRefetching } = useGetProductDetail(product?.id!)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const result = get(data, ['data'])
    setProductDetail(result)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [data, status, isRefetching])

  useEffect(() => {
    const productItem = localStorage.getItem(LocalStorageKeys.PRODUCT)
    if (!productItem) {
      navigate({ href: '/san-pham' }).finally()
      return
    }

    const data = JSON.parse(productItem) as LocalStorageStateType<{
      product: GuestProductDetailType
    }>
    setProductItem(data.state.product)
  }, [])

  return (
    <PageContainer
      title={`${productDetail?.productName}`}
      description={
        productDetail?.description ??
        intl.formatMessage({ id: 'guest.common.productDetailDescription' })
      }
      canonical={`${pagePublicRouters.productDetail}/${slugId}`}
      image={''}
    >
      <Container fixedHeader className='px-5 sm:px-8'>
        {productDetail?.productName && (
          <div className='flex flex-col items-start justify-center'>
            <h1 className='text-center text-3xl font-bold text-[#2A2A2A]'>
              {productDetail?.productName}
            </h1>
            {productDetail?.description && (
              <p className='mt-2 text-sm text-[#7D7C7C]'>{productDetail.description}</p>
            )}
          </div>
        )}
        <div className='custom-quill grid min-h-screen bg-[#F2F1ED]'>
          <QuillEditor
            value={addAltToImages(productDetail?.content ?? '')}
            readOnly
            hideToolbar
          />
        </div>
      </Container>
    </PageContainer>
  )
}
