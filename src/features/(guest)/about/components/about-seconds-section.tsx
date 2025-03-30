interface AboutSecondsSectionProps {
  mainImage: string
  subImage: string
  title?: string
  description?: string
}

export default function AboutSecondsSection(
  props: Readonly<AboutSecondsSectionProps>
) {
  return (
    <div className='grid h-screen w-full sm:h-screen md:grid-cols-2'>
      <div className='flex h-full w-full overflow-hidden bg-cover'>
        <img
          className='h-full w-full object-cover'
          src={props.mainImage}
          alt='cover'
        />
      </div>
      <div className='flex h-full w-full flex-col overflow-hidden bg-[#DFDAD4] p-16'>
        <div className='flex h-full w-full flex-col items-end overflow-hidden sm:items-center md:p-4 lg:items-end lg:p-16'>
          <div className='w-1/5 md:w-1/2 lg:w-1/3'>
            <img
              src={props.subImage}
              className='h-full w-full rounded-sm object-cover'
              alt=''
            />
          </div>
        </div>
        <div className='h-full flex-1 flex-col items-center justify-center lg:px-[64px]'>
          <p className={`philosopher-regular text-start text-4xl lg:text-7xl`}>
            {props.title}
          </p>
          <p
            className={`philosopher-regular line-clamp-4 text-start text-lg lg:text-xl`}
          >
            {props.description}
          </p>
        </div>
      </div>
    </div>
  )
}
