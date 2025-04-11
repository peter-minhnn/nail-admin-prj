import { AboutThirdItem } from './about-third-section'

interface AboutThirdItemProps {
  item: AboutThirdItem
}

export default function AboutThirdItemView(
  props: Readonly<AboutThirdItemProps>
) {
  return (
    <div className='flex flex-col py-4 md:flex-row '>
      <p className={`roboto-regular w-full text-xl md:w-3/7`}>
        {props.item.title}
      </p>
      <hr className='border-t-1 my-4 w-full border-[#A1A1AA] md:mx-8 md:w-1/5' />
      <p
        className={`w-full md:w-3/7 roboto-light sm:line-clamp-8 line-clamp-6 text-base font-light`}
      >
        {props.item.description}
      </p>
    </div>
  )
}
