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
import ActivitiesSlider from './components/activities-slider'

export default function ActivitiesComponent() {
  const intl = useIntl()

  const [filterParams] = useState<BannerPublicFilterParams>({
    type: 5,
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
      title={intl.formatMessage({ id: 'guest.common.activity' })}
      description={intl.formatMessage({ id: 'guest.common.activity' })}
      canonical={menuRoutes.products}
      image={'/images/bg-home.png'}
    >
      <Navbar />
      <Banner path={banner?.url ?? ''} pathMobile={banner?.urlMobile}>
        <div className='absolute  left-0 right-0 bottom-20 items-center justify-center'>
          <p
            className={`philosopher-regular flex h-full w-full items-center justify-center pb-20 text-center text-6xl md:text-7xl lg:text-8xl font-normal text-white md:items-end md:text-end`}
          >
            {intl.formatMessage({ id: 'guest.common.activity' })}
          </p>
        </div>
      </Banner>
      <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED]'>
        <Container>
          <div className='grid min-h-screen items-center justify-items-center md:m-20'>
            <ActivitiesSlider />
          </div>
        </Container>
      </div>
    </PageContainer>
  )
}
