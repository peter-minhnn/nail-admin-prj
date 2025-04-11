interface AboutFouthProps {
  items: Array<string>
}

export default function AboutFouthSection(props: Readonly<AboutFouthProps>) {
  return (
    <div className='grid grid-cols-1 gap-[32px] bg-[#F2F1ED] pb-20  md:grid-cols-3'>
      {props.items.map((item) => {
        return (
          <div className='aspect-square flex-1' key={item}>
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
