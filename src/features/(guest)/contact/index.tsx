import { useEffect, useState } from 'react'
import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { BannerPublicDataType, BannerPublicFilterParams } from '@/types/(guest)'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import Banner from '@/components/(guest)/layout/banner'
import { Container } from '@/components/(guest)/layout/container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'
import ContactForm from './components/contact-form'
import ContactMap from './components/contact-map'
import ContactSocialView from './components/contact-social-view'
import ContactTextInfo from './components/contact-text-info'

export default function ProductsComponent() {
  const intl = useIntl()

  const [filterParams] = useState<BannerPublicFilterParams>({
    type: 6,
    take: 10,
    page: 1,
  })
  const [banner, setBanner] = useState<BannerPublicDataType | null>(null)
  const { data, status, isRefetching } = useGetBanners(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const bannersData: BannerPublicDataType[] = get(data, ['data'], [])
    if (bannersData?.length) {
      setBanner(bannersData[0])
    }
  }, [data, status, isRefetching])

  return (
    <PageContainer
      title={intl.formatMessage({ id: 'guest.contact.pageTitle' })}
      description={intl.formatMessage({ id: 'guest.contact.pageTitle' })}
      canonical={menuRoutes.products}
      image={'/images/bg-home.png'}
    >
      <Navbar />
      <Banner path={banner?.url ?? ''}>
        <div className='absolute top-1/2 w-screen items-center justify-center'>
          <p
            className={`philosopher-regular text-center text-8xl font-normal text-white`}
          >
            {intl.formatMessage({ id: 'guest.contact.pageTitle' })}
          </p>
        </div>
      </Banner>
      <Container>
        <div className='min-h-screen items-center justify-items-center bg-[#F2F1ED] md:m-32'>
          <div className='h-fit w-full'>
            <p className='text-center font-philosopher text-4xl md:text-7xl'>
              {intl.formatMessage({ id: 'guest.contact.contactUs' })}
            </p>
            <div className='flex w-full flex-col justify-between gap-10 py-10 md:flex-row'>
              <div className='col-span-1 flex h-full w-full flex-col gap-9'>
                <ContactTextInfo
                  label={intl.formatMessage({ id: 'guest.contact.email' })}
                  value={'LinhVu@dejavunailspa.net'}
                />
                <ContactTextInfo
                  label={intl.formatMessage({ id: 'guest.contact.phone' })}
                  value={'+84 98 982 10 42'}
                />
                <ContactTextInfo
                  label={intl.formatMessage({ id: 'guest.contact.address' })}
                  value={
                    '839/3 Lê Hồng Phong Phường 12, Quận 10 TP. Hồ Chí Minh'
                  }
                />
                <ContactSocialView />
              </div>
              <div className='flex h-full w-full flex-col items-start gap-7'>
                <ContactForm />
              </div>
            </div>
            <ContactMap />
          </div>
        </div>
      </Container>
    </PageContainer>
  )
}
