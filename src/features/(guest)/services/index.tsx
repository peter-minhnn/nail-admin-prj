import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import ServiceBanner from './components/service-banner'
import ServiceCategoriesSelector from './components/service-categories-selector'
import { Navbar } from '@/components/(guest)/layout/nav-bar'

export default function ServicesComponent() {
  return (
    <PageContainer
      title='Dịch vụ'
      description='Dịch vụ'
      canonical={menuRoutes.products}
      image={''}>
      <Container fixedHeader>
        <div className='relative z-[9999] h-[80vh] w-full bg-cover bg-center sm:h-screen bg-[#EFE5D2]'>
          <Navbar />
          <ServiceBanner />
        </div>
        <div className='grid min-h-screen items-center justify-items-center '>
          <ServiceCategoriesSelector />
        </div>
      </Container>
    </PageContainer>
  )
}
