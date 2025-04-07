import { useEffect, useState } from 'react'
import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { BannerPublicDataType, BannerPublicFilterParams } from '@/types/(guest)'
import get from 'lodash/get'
import Banner from '@/components/(guest)/layout/banner.tsx'
import { Container } from '@/components/(guest)/layout/container.tsx'
import { Footer } from '@/components/(guest)/layout/footer.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'
import HomeActivities from './components/activity/home-activities'
import HomeCollects from './components/collects/home-collects'
import ServicesSlider from './components/services/home-services-slider'

export default function Home() {
  const [filterParams] = useState<BannerPublicFilterParams>({
    type: 0,
    take: 10,
    page: 1,
  })

  const [banner, setBanner] = useState<BannerPublicDataType | null>(null)
  const { data, status, isRefetching } = useGetBanners(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const bannersData = get(data, ['data'], [])
    if (bannersData.length > 0) {
      setBanner(bannersData[0])
    }
  }, [data, status, isRefetching])

  return (
    <PageContainer
      title='Trang chủ'
      description='Nail care is essential for maintaining healthy and beautiful nails. Learn how to care for your nails with our tips and advice.'
      canonical={menuRoutes.home}
      image={banner?.url ?? ''}
    >
      <Navbar />
      <Banner path={banner?.url ?? ''}>
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
      <Container footer={false}>
        <div className='items-center justify-items-center bg-[#F2F1ED]'>
          <section className='max-w-full justify-center text-center'>
            <ServicesSlider />
          </section>

          {/* Section 2 */}
          <section className='w-full max-w-full text-center'>
            <HomeActivities />
          </section>
        </div>
      </Container>
      {/* Section 3 */}
      <section className='w-screen text-center'>
        <HomeCollects />
      </section>
      <Footer />
    </PageContainer>
  )
}
