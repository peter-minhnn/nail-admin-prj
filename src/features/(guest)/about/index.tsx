import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { IntlShape, useIntl } from 'react-intl'
import Banner from '@/components/(guest)/layout/banner'
import { Container } from '@/components/(guest)/layout/container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import AboutFirstSection from './components/about-first-section'
import AboutFouthSection from './components/about-fouth-section'
import AboutSecondsSection from './components/about-seconds-section'
import AboutThirdSection from './components/about-third-section'
import { BannerPublicDataType, BannerPublicFilterParams } from '@/types/(guest)'
import { useEffect, useState } from 'react'
import { useGetBanners } from '../hook/use-guest-queries'
import get from 'lodash/get'

const aboutThirdData = (intl: IntlShape) => {
  return [
    {
      title: intl.formatMessage({
        id: 'aboutUs.section3Item1Title',
      }),
      description: intl.formatMessage({
        id: 'aboutUs.section3Item1Description',
      }),
    },
    {
      title: intl.formatMessage({
        id: 'aboutUs.section3Item2Title',
      }),
      description: intl.formatMessage({
        id: 'aboutUs.section3Item2Description',
      }),
    },
    {
      title: intl.formatMessage({
        id: 'aboutUs.section3Item3Title',
      }),
      description: intl.formatMessage({
        id: 'aboutUs.section3Item3Description',
      }),
    },
  ]
}

export default function AboutUsComponent() {
  const intl = useIntl()

  const [filterParams] = useState<BannerPublicFilterParams>({
    type: 1,
    take: 10,
    page: 1,
  })

  const [banner, setBanner] = useState<BannerPublicDataType | null>(null)
  const { data, status, isRefetching } = useGetBanners(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const bannersData = get(data, ['data'], [])
    if (bannersData.length > 0) {
      setBanner(bannersData[0])
    }
  }, [data, status, isRefetching])


  return (
    <PageContainer
      title={intl.formatMessage({ id: 'aboutUs.pageTitle' })}
      description={intl.formatMessage({ id: 'aboutUs.pageTitle' })}
      canonical={menuRoutes.about}
      image={'/images/aboutus_banner.png'}
    >
      <Navbar />
      <Banner path={banner?.url} pathMobile={banner?.urlMobile} >
        <div className='absolute flex left-0 top-0 right-0 bottom-0  items-center justify-center'>
          <p
            className={`philosopher-regular px-6 text-center text-6xl md:text-7xl lg:text-8xl font-normal text-white`}
          >
            {intl.formatMessage({ id: 'aboutUs.pageTitle' })}
          </p>
        </div>
      </Banner>
      <Container header={false} footer={false}>
        <AboutFirstSection
          images={[
            '/images/aboutus_section1_1.png',
            '/images/aboutus_section1_2.png',
            '/images/aboutus_section1_3.png',
            '/images/aboutus_section1_4.png',
          ]}
          title={intl.formatMessage({ id: 'aboutUs.section1Title' })}
          description={intl.formatMessage({
            id: 'aboutUs.section1Description',
          })}
        />
      </Container>
      <AboutSecondsSection
        mainImage={'/images/aboutus_section2_1.png'}
        subImage={'/images/aboutus_section2_2.png'}
        title={intl.formatMessage({ id: 'aboutUs.section2Title' })}
        description={intl.formatMessage({
          id: 'aboutUs.section2Description',
        })}
      />
      <AboutThirdSection items={aboutThirdData(intl)} />
      <Container header={false}>
        <AboutFouthSection
          items={[
            '/images/aboutus_section4_1.png',
            '/images/aboutus_section4_2.png',
            '/images/aboutus_section4_3.png',
          ]}
        />
      </Container>
    </PageContainer>
  )
}
