interface AboutFouthProps {
  items: Array<string>
}

export default function AboutFouthSection(props: Readonly<AboutFouthProps>) {
  return (
    <div className='grid min-h-screen w-screen grid-cols-1 gap-[32px] bg-[#F2F1ED] px-6 sm:px-16 pb-20 pt-32 md:grid-cols-3'>
      {props.items.map((item) => {
        return (
          <div className='aspect-square flex-1'>
            <img
              alt=''
              src={item}
              className='h-full w-full rounded-sm object-cover'
            />
          </div>
        )
      })}
    </div>
  )
}
