import { useEffect, useState } from 'react'
import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { BannerPublicDataType, BannerPublicFilterParams } from '@/types/(guest)'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import Banner from '@/components/(guest)/layout/banner'
import { Container } from '@/components/(guest)/layout/container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'
import ProductSection from './components/product-section'

export default function ProductsComponent() {
  const intl = useIntl()

  const [filterParams] = useState<BannerPublicFilterParams>({
    type: 4,
    take: 10,
    page: 1,
  })
  const [banner, setBanner] = useState<BannerPublicDataType | null>(null)
  const { data, status, isRefetching } = useGetBanners(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const bannersData: BannerPublicDataType[] = get(data, ['data'], [])
    if (bannersData.length > 0) {
      setBanner(bannersData[0])
    }
  }, [data, status, isRefetching])

  return (
    <PageContainer
      title={intl.formatMessage({ id: 'guest.common.product' })}
      description={intl.formatMessage({ id: 'guest.common.product' })}
      canonical={menuRoutes.products}
      image={'/images/bg-home.png'}
    >
      <Navbar />
      <Banner path={banner?.url ?? ''} pathMobile={banner?.urlMobile ?? ""}>
        <div className='absolute flex left-0 top-0 right-0 bottom-0  items-center justify-center '>
          <p
            className={`philosopher-regular text-center text-6xl md:text-7xl lg:text-8xl font-normal text-white`}
          >
            {intl.formatMessage({ id: 'guest.common.product' })}
          </p>
        </div>
      </Banner>
      <div className='min-h-screen items-center justify-items-center bg-[#F2F1ED]'>
        <Container className='pt-6'>
          <ProductSection />
        </Container>
      </div>
    </PageContainer>
  )
}
