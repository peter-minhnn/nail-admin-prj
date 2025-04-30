import { useIntl } from 'react-intl'
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
  const intl = useIntl()
  return (
    <div className='min-h-screen'>
      <div className='my-32 w-fit flex-col'>
        <div className='flex h-[228px] w-screen'>
          <div className='flex w-screen justify-center'>
            <img
              srcSet='/images/about_us_5.png'
              className='h-full w-[416px]'
              alt=''
            />
          </div>
          <div className='absolute flex h-[228px] w-full items-center justify-center'>
            <p
              className={`philosopher-regular text-3xl text-center md:text-5xl lg:text-7xl`}
            >
              {intl.formatMessage({ id: 'aboutUs.section3Title' })}
            </p>
          </div>
        </div>

        <div className='w-full flex-1 items-center justify-center pt-32'>
          <div
            className={`flex flex-1 items-center justify-center bg-[url('/images/dejavu-hidden.png')] bg-cover bg-center`}
          >
            <div className='w-full max-w-screen-lg px-6 md:px-20 lg:px-0'>
              {props.items.map((item) => (
                <AboutThirdItemView item={item} key={uuid()} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
