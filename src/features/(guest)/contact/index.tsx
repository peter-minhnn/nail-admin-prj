import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'

export default function ContactComponent() {
  return (
    <PageContainer
      title='Liên hệ'
      description='Liên hệ'
      canonical={menuRoutes.contact}
      image={'/images/bg-home.png'}
    >
      <Container fixedHeader>
        <div className='grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20'>
          Liên hệ
        </div>
      </Container>
    </PageContainer>
  )
}
