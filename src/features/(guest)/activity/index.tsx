import { useEffect, useState } from 'react'
import {
  BannerPublicDataType,
  BannerPublicFilterParams,
} from '@/entities/(guest)/banner'
import { menuRoutes } from '@/entities/(guest)/routes.ts'
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
    const list = get(data, ['data'], [])
    const bannersData: BannerPublicDataType[] = list
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
      <Banner path={banner?.url ?? ''}>
        <Navbar />
        <div className='absolute top-20 h-screen w-screen p-20'>
          <p
            className={`philosopher-regular flex h-full w-full items-center justify-center pb-20 text-center text-8xl font-normal text-white md:items-end md:text-end`}
          >
            {intl.formatMessage({ id: 'guest.common.activity' })}
          </p>
        </div>
      </Banner>
      <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED]'>
        <Container fixedHeader>
          <div className='m-10 grid min-h-screen items-center justify-items-center md:m-20'>
            <ActivitiesSlider />
          </div>
        </Container>
      </div>
    </PageContainer>
  )
}
