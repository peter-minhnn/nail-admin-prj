import { v4 as uuid } from 'uuid'
import AboutThirdItemView from './about-third-item'

export interface AboutThirdItem {
  title?: string
  description: string
}

interface AboutThirdSectionProps {
  items: Array<AboutThirdItem>
}

export default function AboutThirdSection(
  props: Readonly<AboutThirdSectionProps>
) {
  return (
    <div className='min-h-screen '>
      <div className='my-32  w-fit flex-col'>
        <div className='flex h-[228px] w-screen'>
          <div className='flex w-screen justify-center'>
            <img
              srcSet='/images/about_us_5.png'
              className='h-full w-[416px]'
              alt=''
            />
          </div>
          <div className='absolute flex h-[228px] w-screen items-center truncate'>
            <p className={`philosopher-regular md:text-7xl text-4xl lg:text-8xl`}>
              VU NAIL & SPA DEJÀ VU NAIL & SPA DEJÀ VU NAIL & SPA DEJÀ VU NAIL &
              SPA
            </p>
          </div>
        </div>

        <div className='w-full flex-1 items-center justify-center pt-32 '>
          <div className={`flex flex-1 items-center justify-center bg-cover bg-center bg-[url('/images/dejavu-hidden.png')]`}>
            <div className='w-full px-6 md:px-20 lg:!w-1/2 lg:px-0'>
              {props.items.map((item) => {
                return <AboutThirdItemView item={item} key={uuid()} />
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
