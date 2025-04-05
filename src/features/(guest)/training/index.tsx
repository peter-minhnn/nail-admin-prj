import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import TrainingBanner from './components/training-banner'
import TrainingPostsSection from './components/training-posts-section'

export default function TrainingComponent() {
  return (
    <PageContainer
      title='Đào tạo'
      description='Đào tạo'
      canonical={menuRoutes.products}
      image={'/images/bg-home.png'}
    >
      <div className='relative min-h-screen w-full bg-[#EFE5D2] bg-cover bg-center sm:h-screen'>
        <TrainingBanner />
      </div>
      <Container>
        <div className='grid items-center justify-items-center'>
          <TrainingPostsSection />
        </div>
      </Container>
    </PageContainer>
  )
}
