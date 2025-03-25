import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import TrainingBanner from './components/training-banner'
import TrainingIndustries from './components/training-industries'

export default function TrainingComponent() {
  return (
    <PageContainer
      title='Đào tạo'
      description='Đào tạo'
      canonical={menuRoutes.products}
      image={'/images/bg-home.png'}
    >
      <Container fixedHeader>
        <div className='relative z-[9999] h-[80vh] w-full bg-cover bg-center sm:h-screen bg-[#EFE5D2]'>
          <Navbar />
          <TrainingBanner />
        </div>
        <div className='grid min-h-screen items-center justify-items-center '>
          <TrainingIndustries />
        </div>
      </Container>
    </PageContainer>
  )
}
