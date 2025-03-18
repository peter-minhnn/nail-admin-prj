import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'

export default function AboutUsComponent() {
  return (
    <PageContainer
      title='Về chúng tôi'
      description='Về chúng tôi'
      canonical={menuRoutes.about}
      image={'/images/bg-home.png'}
    >
      <Container fixedHeader>
        <div className='grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20'>
          về chúng tôi
        </div>
      </Container>
    </PageContainer>
  )
}
