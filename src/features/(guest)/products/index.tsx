import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useEffect, useState } from 'react'
import { BannerDataType, bannersListSchema, BannerFilterParams } from '@/entities/(guest)/banner'
import get from 'lodash/get'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'
import Banner from '@/components/(guest)/layout/banner'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import ProductSection from './components/product-section'
import { useIntl } from 'react-intl'

export default function ProductsComponent() {
  const intl = useIntl()

  const [filterParams] = useState<BannerFilterParams>({
    type: 4,
    take: 10,
    page: 1
  })
  const [banner, setBanner] = useState<BannerDataType | null>(null)
  const { data, status, isRefetching } = useGetBanners(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    const bannersData = bannersListSchema.parse(list);
    if (bannersData.length > 0) {
      setBanner(bannersData[0]);
    }
  }, [data, status, isRefetching])



  return (
    <PageContainer
      title={intl.formatMessage({ id: "guest.common.product" })}
      description={intl.formatMessage({ id: "guest.common.product" })}
      canonical={menuRoutes.products}
      image={'/images/bg-home.png'}
    >
      <Banner path={banner?.url}>
        <Navbar />
        <div className="absolute top-1/2 h-screen w-screen items-center justify-center">
          <p
            className={`text-center text-8xl font-normal  text-white philosopher-regular `}
          >
            {intl.formatMessage({ id: "guest.common.product" })}
          </p>
        </div>
      </Banner>
      <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED]  '>
        <Container>
          <ProductSection />
        </Container>
      </div>
    </PageContainer>
  )
}
