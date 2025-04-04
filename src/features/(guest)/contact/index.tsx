import { useEffect, useState } from 'react'
import {
  BannerPublicDataType,
  BannerPublicFilterParams
} from '@/entities/(guest)/banner'
import { menuRoutes } from '@/entities/(guest)/routes.ts'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import Banner from '@/components/(guest)/layout/banner'
import { Container } from '@/components/(guest)/layout/container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'
import ContactForm from './components/contact-form'
import ContactTextInfo from './components/contact-text-info'
import ContactSocialView from './components/contact-social-view'
import ContactMap from './components/contact-map'

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
    const list = get(data, ['data'], [])
    const bannersData: BannerPublicDataType[] = list;
    if (bannersData.length > 0) {
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
      <Banner path={banner?.url ?? ""}>
        <Navbar />
        <div className='absolute top-1/2 w-screen items-center justify-center'>
          <p
            className={`philosopher-regular text-center text-8xl font-normal text-white`}
          >
            {intl.formatMessage({ id: 'guest.contact.pageTitle' })}
          </p>
        </div>
      </Banner>
      <Container>
        <div className='my-32 grid min-h-screen items-center justify-items-center bg-[#F2F1ED]'>
          <div className='h-fit w-screen'>
            <p className='text-center font-philosopher text-7xl'>
              {intl.formatMessage({ id: 'guest.contact.contactUs' })}
            </p>
            <div className='grid h-fit w-screen grid-cols-1 grid-rows-2 px-10 py-16 md:grid-cols-3 md:grid-rows-1 md:px-44'>
              <div className='col-span-1 flex h-full w-full flex-col gap-9'>
                <ContactTextInfo label={intl.formatMessage({ id: 'guest.contact.email' })} value={'LinhVu@dejavunailspa.net'} />
                <ContactTextInfo label={intl.formatMessage({ id: 'guest.contact.phone' })} value={'+84 98 982 10 42'} />
                <ContactTextInfo label={intl.formatMessage({ id: 'guest.contact.address' })} value={'839/3 Lê Hồng Phong Phường 12, Quận 10 TP. Hồ Chí Minh'} />
                <ContactSocialView />
              </div>
              <div className='col-span-2 flex h-full w-full flex-col items-start gap-7 px-0 md:px-32'>
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
