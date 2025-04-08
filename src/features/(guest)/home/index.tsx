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
        <div className='flex h-screen flex-col items-center justify-center'>
          <div className='flex h-auto w-full justify-center md:justify-start md:pl-20'>
            <p
              className={`philosopher-regular text-7xl font-normal text-white lg:text-8xl`}
            >
              NAIL CARE
            </p>
          </div>
          <div className='flex h-auto w-full justify-center md:justify-start md:pl-[34rem]'>
            <p
              className={`philosopher-regular text-8xl font-normal text-[#FEDE59] lg:text-9xl`}
            >
              is
            </p>
          </div>
          <div className='flex h-auto w-full justify-center md:justify-start md:pl-80'>
            <p
              className={`philosopher-regular text-7xl font-normal text-white lg:text-8xl`}
            >
              SELF CARE
            </p>
          </div>
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
