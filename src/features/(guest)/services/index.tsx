import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import ServiceBanner from './components/service-banner'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import { useIntl } from 'react-intl'
import ServicePostsSection from './components/service-posts-section'

export default function ServicesComponent() {
  const intl = useIntl();
  return (
    <PageContainer
      title={intl.formatMessage({ id: 'guest.common.service' })}
      description={intl.formatMessage({ id: 'guest.common.service' })}
      canonical={menuRoutes.products}
      image={''}>
      <Container fixedHeader>
        <div className='relative z-[9999] h-[80vh] w-full bg-cover bg-center sm:h-screen bg-[#EFE5D2]'>
          <ServiceBanner />
          <Navbar />
        </div>
        <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED]'>
          <section className='min-h-screen my-32'>
            <ServicePostsSection />
          </section>
        </div>
      </Container>
    </PageContainer>
  )
}
