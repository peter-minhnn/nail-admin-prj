import { useEffect, useState } from 'react'
import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { BannerPublicDataType, BannerPublicFilterParams } from '@/types/(guest)'
import get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'
import Banner from '@/components/(guest)/layout/banner'
import { Container } from '@/components/(guest)/layout/container.tsx'
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
      <Banner path={banner?.url ?? ''} pathMobile={banner?.urlMobile}>
        <div className='absolute bottom-20 left-0 right-0 items-center justify-center'>
          <p
            className={`philosopher-regular flex h-full w-full items-center justify-center pb-20 text-center text-6xl font-normal text-white md:items-end md:text-end md:text-7xl lg:text-8xl`}
          >
            {intl.formatMessage({ id: 'guest.common.activity' })}
          </p>
        </div>
      </Banner>
      <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED]'>
        <Container className='max-w-full'>
          <div className='grid min-h-screen items-center justify-items-center md:m-20'>
            <h1 className='relative text-center text-5xl font-bold uppercase text-[#E48E43] sm:text-7xl'>
              <FormattedMessage id='guest.common.listActivity' />
              <span className='absolute bottom-[-10px] left-1/2 w-1/2 -translate-x-1/2 transform border-2 border-b-2 border-[#E48E43]'></span>
            </h1>
            <ActivitiesSlider />
          </div>
        </Container>
      </div>
    </PageContainer>
  )
}
