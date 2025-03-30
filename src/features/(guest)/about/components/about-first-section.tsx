interface AboutFirstSectionProps {
  images: Array<string>
  title?: string
  description?: string
}

export default function AboutFirstSection(
  props: Readonly<AboutFirstSectionProps>
) {
  return (
    <div className='h-fit w-screen bg-[#F2F1ED] px-8 py-32'>
      <div className='flex h-[428px] flex-1 justify-center gap-36'>
        <div className='flex justify-center gap-x-5 md:gap-x-10 lg:gap-x-36'>
          {props.images.map((_, index) => {
            return renderItem(index)
          })}
        </div>
      </div>
      <div className='flex max-h-[250px] w-full flex-col items-center justify-center'>
        <div className='flex h-full w-full flex-col items-center justify-center md:w-1/2'>
          <p className={`philosopher-regular mb-5 text-7xl`}>{props.title}</p>
          <p className={`philosopher-regular text-base font-light`}>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  )

  function renderItem(index: number) {
    var mt = ''
    switch (index) {
      case 0:
        mt = 'mt-36'
        break
      case 1:
        break
      case 2:
        mt = 'mt-[80px]'
        break
      case 3:
        mt = 'mt-[145px]'
        break
    }

    return (
      <div className={`flex h-[281px] w-full bg-red-500 ${mt}`}>
        <img
          className='h-full w-full rounded-sm object-cover'
          src={props.images[index]}
          alt=''
        />
      </div>
    )
  }
}
