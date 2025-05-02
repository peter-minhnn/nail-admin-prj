import { useIntl } from 'react-intl'
import AboutFirstImageItem from './about-first-image-item'

interface AboutFirstSectionProps {
  images: Array<string>
}

export default function AboutFirstSection(
  props: Readonly<AboutFirstSectionProps>
) {
  const intl = useIntl()
  return (
    <div className='h-fit bg-[#F2F1ED] py-32'>
      <div className='flex h-[428px] flex-1 justify-center gap-36'>
        <div className='flex justify-center gap-x-5 md:gap-x-10 lg:gap-x-36'>
          {props.images.map((_, index) => {
            return (
              <AboutFirstImageItem
                index={index}
                image={props.images[index]}
                key={_}
              />
            )
          })}
        </div>
      </div>
      <div className='flex min-h-[250px] w-full flex-col items-center justify-center overflow-hidden'>
        <div className='mt-4 flex h-fit w-full flex-col items-center justify-center gap-2 md:w-9/12'>
          <p className={`philosopher-regular text-center text-4xl md:text-6xl`}>
            {intl.formatMessage({ id: 'aboutUs.section1Title' })}
          </p>
          <div className='flex w-full items-center'>
            <div className='flex-grow border-t border-gray-300' />
            <span className='mb-5 font-philosopher text-base italic'>
              {intl.formatMessage({ id: 'aboutUs.section1ShortTitle' })}
            </span>
            <div className='flex-grow border-t border-gray-300' />
          </div>
          <span
            className={`philosopher-regular text-justify text-base font-light`}
          >
            <span className='font-bold'>
              {intl.formatMessage({ id: 'aboutUs.sectionStore' })}{' '}
            </span>
            {intl.formatMessage({ id: 'aboutUs.sectionStoreDescription' })}
          </span>
          <span
            className={`philosopher-regular text-justify text-base font-light`}
          >
            <span className='font-bold'>
              {intl.formatMessage({ id: 'aboutUs.sectionVision' })}{' '}
            </span>
            {intl.formatMessage({ id: 'aboutUs.sectionVisionDescription' })}
          </span>
          <span
            className={`philosopher-regular text-justify text-base font-light`}
          >
            {intl.formatMessage({ id: 'aboutUs.sectionMissionStart' })}
            <span className='font-bold'>
              {' '}
              {intl.formatMessage({ id: 'aboutUs.sectionMission' })}{' '}
            </span>
            {intl.formatMessage({ id: 'aboutUs.sectionMissionEnd' })}
          </span>
        </div>
      </div>
    </div>
  )
}
