import { menuRoutes } from '@/entities/(guest)/routes.ts'
import Banner from '@/components/(guest)/layout/banner.tsx'
import { Container } from '@/components/(guest)/layout/container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import ServicesSlider from './components/services/home-services-slider'
import HomeActivities from './components/activity/home-activities'
import HomeCollects from './components/collects/home-collects'
import { useEffect, useState } from 'react'
import { BannerFilterParams } from '@/types/banners.type'
import { BannerDataType, bannersListSchema } from '@/entities/(guest)/banner'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'
import get from 'lodash/get'
export default function Home() {
  const [filterParams] = useState<BannerFilterParams>({
    type: 0,
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
      title='Trang chủ'
      description='Nail care is essential for maintaining healthy and beautiful nails. Learn how to care for your nails with our tips and advice.'
      canonical={menuRoutes.home}
      image={banner?.url ?? ""}
    >
      <Banner path={banner?.url ?? ""}>
        <Navbar />
        <div className='absolute left-10 top-1/3 h-auto w-auto md:left-8'>
          <p
            className={`philosopher-regular text-7xl font-normal text-white lg:text-8xl`}
          >
            NAIL CARE
          </p>
        </div>
        <div className='xl:top-74 absolute left-[12rem] top-[19rem] h-auto w-auto sm:left-[24rem] sm:top-[16.5rem] lg:left-[32rem] lg:top-[18rem]'>
          <p
            className={`philosopher-regular text-8xl font-normal text-[#FEDE59] lg:text-9xl`}
          >
            is
          </p>
        </div>
        <div className='absolute left-10 top-[24rem] h-auto w-auto md:left-52 md:top-[22rem] lg:top-[25rem] xl:top-[52%]'>
          <p
            className={`philosopher-regular text-7xl font-normal text-white lg:text-8xl`}
          >
            SELF CARE
          </p>
        </div>
      </Banner>
      <Container>
        <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED] '>
          <section className='w-screen h-screen text-center justify-center'>
            <ServicesSlider />
          </section>

          {/* Section 2 */}
          <section className='w-full text-center h-screen'>
            <HomeActivities />
          </section>

          {/* Section 3 */}
          <section className='w-full text-center'>
            <HomeCollects />
          </section>
        </div>
      </Container>
    </PageContainer>
  )
}
