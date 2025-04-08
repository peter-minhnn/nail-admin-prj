import AboutFirstImageItem from './about-first-image-item'

interface AboutFirstSectionProps {
  images: Array<string>
  title?: string
  description?: string
}

export default function AboutFirstSection(
  props: Readonly<AboutFirstSectionProps>
) {
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
      <div className='flex min-h-[250px] w-full flex-col items-center justify-center'>
        <div className='flex h-fit w-full flex-col items-center justify-center md:w-9/12'>
          <p className={`philosopher-regular mb-5 text-5xl md:text-7xl`}>
            {props.title}
          </p>
          <p className={`philosopher-regular text-base font-light`}>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  )
}
