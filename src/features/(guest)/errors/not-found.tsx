import { useIntl } from 'react-intl'
import FuzzyText from '@/components/(guest)/ui/fuzzy-text'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar.tsx'
import { Container } from '@/components/(guest)/layout/container.tsx'

export default function GuestNotFound() {
  const intl = useIntl()
  return (
    <PageContainer title="404" description={"Not found page"} canonical="/404" image="">
      <Navbar/>
      <div className='grid min-h-screen items-center justify-items-center bg-[#F2F1ED]'>
        <Container fixedHeader>
          <div className="m-10 grid min-h-screen items-center justify-items-center md:m-20">
            <FuzzyText baseIntensity={0.2} hoverIntensity={0.1} enableHover color="#232B2B" fontSize='clamp(1rem, 5vw, 5rem)'>
              {intl.formatMessage({id: 'common.pageNotFound'})}
            </FuzzyText>
          </div>
        </Container>
      </div>
    </PageContainer>
  )
}
