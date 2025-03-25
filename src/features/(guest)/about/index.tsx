import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import Banner from '@/components/(guest)/layout/banner'
import AboutFirstSection from './components/about-first-section'
import AboutSecondsSection from './components/about-seconds-section'
import AboutThirdSection from './components/about-third-section'
import AboutFouthSection from './components/about-fouth-section'
import { useIntl } from 'react-intl'

export default function AboutUsComponent() {
  const intl = useIntl()

  return (
    <PageContainer
      title={intl.formatMessage({ id: "aboutUs.pageTitle" })}
      description={intl.formatMessage({ id: "aboutUs.pageTitle" })}
      canonical={menuRoutes.about}
      image={'/images/aboutus_banner.png'}
    >
      <Container fixedHeader>
        <Banner path={"/images/aboutus_banner.png"}>
          <Navbar />
          <div className="absolute top-1/2 h-screen w-screen items-center justify-center">
            <p
              className={`text-center text-8xl font-normal  text-white philosopher-regular `}
            >
              {intl.formatMessage({ id: "aboutUs.pageTitle" })}
            </p>
          </div>
        </Banner>
        <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED]  '>
          <AboutFirstSection
            images={[
              '/images/aboutus_section1_1.png',
              '/images/aboutus_section1_2.png',
              '/images/aboutus_section1_3.png',
              '/images/aboutus_section1_4.png',

            ]}
            title={intl.formatMessage({ id: "aboutUs.section1Title" })}
            description={intl.formatMessage({ id: "aboutUs.section1Description" })} />
          <AboutSecondsSection
            mainImage={
              '/images/aboutus_section2_1.png'
            }
            subImage={
              '/images/aboutus_section2_2.png'
            }
            title={intl.formatMessage({ id: "aboutUs.section2Title" })}
            description={intl.formatMessage({ id: "aboutUs.section2Description" })}
          />
          <AboutThirdSection
            items={[
              {
                title: intl.formatMessage({ id: "aboutUs.section3Item1Title" }),
                desctiption: intl.formatMessage({ id: "aboutUs.section3Item1Description" })
              },
              {
                title: intl.formatMessage({ id: "aboutUs.section3Item2Title" }),
                desctiption: intl.formatMessage({ id: "aboutUs.section3Item2Description" })
              },
              {
                title: intl.formatMessage({ id: "aboutUs.section3Item3Title" }),
                desctiption: intl.formatMessage({ id: "aboutUs.section3Item3Description" })
              },
            ]}
          />
          <AboutFouthSection
            items={[
              '/images/aboutus_section4_1.png',
              '/images/aboutus_section4_2.png',
              '/images/aboutus_section4_3.png',
            ]}
          />
        </div>
      </Container>
    </PageContainer>
  )
}
