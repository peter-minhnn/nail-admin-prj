import { menuRoutes } from '@/entities/(guest)/routes.ts'
import Banner from '@/components/(guest)/layout/banner.tsx'
import { Container } from '@/components/(guest)/layout/container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import ServicesSlider from './components/services/home_services_slider'
import HomeActivities from './components/activity/home_activities'

export default function Home() {
  return (
    <PageContainer
      title='Trang chủ'
      description='Nail care is essential for maintaining healthy and beautiful nails. Learn how to care for your nails with our tips and advice.'
      canonical={menuRoutes.home}
      image={'/images/bg-home.png'}
    >
      <Banner path='/images/bg-home.png'>
        <Navbar />
        <div className='absolute left-10 top-1/3 h-auto w-auto md:left-8'>
          <p
            className={`philosopher-regular text-7xl font-normal text-white lg:text-8xl`}
          >
            NAIL CARE
          </p>
        </div>
        <div className='xl:top-74 absolute left-[12rem] top-[19rem] h-auto w-auto sm:left-[24rem] sm:top-[16.5rem] lg:left-[32rem] lg:top-[18rem]'>
          <p
            className={`philosopher-regular text-8xl font-normal text-[#FEDE59] lg:text-9xl`}
          >
            is
          </p>
        </div>
        <div className='absolute left-10 top-[24rem] h-auto w-auto md:left-52 md:top-[22rem] lg:top-[25rem] xl:top-[52%]'>
          <p
            className={`philosopher-regular text-7xl font-normal text-white lg:text-8xl`}
          >
            SELF CARE
          </p>
        </div>
      </Banner>
      <Container>
        <div className='grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20'>
          {/*  CONTENT HERE  */}
          {/* Section 1 */}
          <section className='w-full  h-screen text-center'>
            <ServicesSlider items={[
              {
                thumbnail: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f',
                title: 'EYELASH',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
              },
              {
                thumbnail: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f',
                title: 'NAIL',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
              },
              {
                thumbnail: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f',
                title: 'MAKEUP',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
              },
              {
                thumbnail: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f',
                title: 'LOREM IPSUM DOLOR',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
              },
            ]} />

          </section>

          {/* Section 2 */}
          <section className='w-full text-center w-full  h-screen'>
            <HomeActivities />
          </section>

          {/* Section 3 */}
          <section className='w-full text-center'>
            <h2 className='text-4xl font-bold text-indigo-500'>
              Nail Care Tips
            </h2>
            <p className='mt-4 text-lg text-gray-700'>
              Proper nail care involves regular cleaning, using quality nail
              products, and protecting your nails from damage. Follow these tips
              to keep your nails looking their best.
            </p>
          </section>
        </div>
      </Container>
    </PageContainer>
  )
}
