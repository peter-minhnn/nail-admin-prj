import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useEffect, useState } from 'react'
import { BannerDataType, bannersListSchema } from '@/entities/(guest)/banner'
import get from 'lodash/get'
import { useGetBanners } from '@/features/(admin)/posts/hooks/use-guest-queries'
import { BannerFilterParams } from '@/types/banners.type'
import Banner from '@/components/(guest)/layout/banner'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import ActivitesGrid from './components/activity-grid'
import ActivitiesSlider from './components/activities_slider'

export default function ActivitiesComponent() {
  const [filterParams] = useState<BannerFilterParams>({
    type: 4,
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
      title='Hoat Dong'
      description='Hoat Dong'
      canonical={menuRoutes.products}
      image={'/images/bg-home.png'}
    >
      <Banner path={banner?.url}>
        <Navbar />
        <div className="absolute h-screen w-screen top-16 ">
          <p
            className={` w-full h-full flex text-center p-20 items-end justify-center text-8xl font-normal  text-white philosopher-regular `}
          >
            Hoat Dong
          </p>
        </div>
      </Banner>
      <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED]  '>
        <Container fixedHeader>
          <div className='grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20'>
            <ActivitiesSlider />
          </div>
        </Container>
      </div>
    </PageContainer>
  )
}
