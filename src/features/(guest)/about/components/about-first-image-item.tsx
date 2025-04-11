interface AboutFirstItemProps {
  index: number
  image: string
}

export default function AboutFirstImageItem(
  props: Readonly<AboutFirstItemProps>
) {
  let mt = ''
  switch (props.index) {
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
    <div className={`flex h-[281px] w-full ${mt}`}>
      <img
        className='h-full w-full rounded-sm object-cover'
        src={props.image}
        alt=''
      />
    </div>
  )
}
