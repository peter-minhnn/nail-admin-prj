import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useEffect, useState } from 'react'
import { BannerDataType, BannerFilterParams, bannersListSchema } from '@/entities/(guest)/banner'
import get from 'lodash/get'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'
import Banner from '@/components/(guest)/layout/banner'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import ActivitiesSlider from './components/activities-slider'
import { useIntl } from 'react-intl'

export default function ActivitiesComponent() {
  const intl = useIntl()

  const [filterParams] = useState<BannerFilterParams>({
    type: 5, take: 10, page: 1
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
      title={intl.formatMessage({ id: "guest.common.activity" })}
      description={intl.formatMessage({ id: "guest.common.activity" })}
      canonical={menuRoutes.products}
      image={'/images/bg-home.png'}
    >
      <Banner path={banner?.url}>
        <Navbar />
        <div className="absolute h-screen w-screen p-20 top-20  ">
          <p
            className={` w-full h-full pb-20 flex md:text-end text-center md:items-end items-center justify-center text-8xl font-normal  text-white philosopher-regular `}
          >
            {intl.formatMessage({ id: "guest.common.activity" })}
          </p>
        </div>
      </Banner>
      <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED]  '>
        <Container fixedHeader>
          <div className='grid min-h-screen items-center justify-items-center md:m-20 m-10'>
            <ActivitiesSlider />
          </div>
        </Container>
      </div>
    </PageContainer>
  )
}
