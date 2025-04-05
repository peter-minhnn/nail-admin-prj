import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { useIntl } from 'react-intl'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import ServiceBanner from './components/service-banner'
import ServicePostsSection from './components/service-posts-section'

export default function ServicesComponent() {
  const intl = useIntl()
  return (
    <PageContainer
      title={intl.formatMessage({ id: 'guest.common.service' })}
      description={intl.formatMessage({ id: 'guest.common.service' })}
      canonical={menuRoutes.products}
      image={''}
    >
      <div className='relative min-h-screen w-full bg-[#EFE5D2] bg-cover bg-center pt-4 sm:h-screen'>
        <ServiceBanner />
      </div>
      <Container>
        <div className='my-32 grid items-center justify-items-center bg-[#F2F1ED]'>
          <section className='w-full'>
            <ServicePostsSection />
          </section>
        </div>
      </Container>
    </PageContainer>
  )
}
