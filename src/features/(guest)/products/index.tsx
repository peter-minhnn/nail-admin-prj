import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useEffect, useState } from 'react'
import { BannerDataType, bannersListSchema } from '@/entities/(guest)/banner'
import get from 'lodash/get'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'
import { BannerFilterParams } from '@/types/banners.type'
import Banner from '@/components/(guest)/layout/banner'
import { Navbar } from '@/components/(guest)/layout/nav-bar'

export default function ProductsComponent() {
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
      title='Sản phẩm'
      description='Sản phẩm'
      canonical={menuRoutes.products}
      image={'/images/bg-home.png'}
    >
      <Banner path={banner?.url}>
        <Navbar />
        <div className="absolute top-1/2 h-screen w-screen items-center justify-center">
          <p
            className={`text-center text-8xl font-normal  text-white philosopher-regular `}
          >
            Sản phẩm
          </p>
        </div>
      </Banner>
      <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED]  '>
        <Container fixedHeader>
          <div className='grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20'>
            Sản phẩm
          </div>
        </Container>
      </div>
    </PageContainer>
  )
}
