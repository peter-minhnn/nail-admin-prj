import { pagePublicRouters } from '@/entities/(guest)/routes'
import { PostPublicType } from '@/types/(guest)'

interface ServiceProps {
  item: PostPublicType
  height?: string
  imgHeight?: string
}

export default function HomeItemService(props: Readonly<ServiceProps>) {
  return (
    <a href={`${pagePublicRouters.serviceDetail}/${props.item.id}`}>
      <div
        className={`flex flex-col ${props.height} w-full rounded-sm sm:w-[416px]`}
      >
        <div className='w-full items-start overflow-hidden text-start'>
          <img
            alt=''
            src={props.item.thumbnail}
            className={`aspect-square w-full flex-1 rounded-sm ${props.imgHeight} object-cover transition-transform duration-300 hover:scale-110`}
          />
        </div>
        <p
          className={`roboto-regular mb-3 mt-7 line-clamp-1 text-start text-xl`}
        >
          {props.item.title}
        </p>
        <p
          className={`roboto-light line-clamp-2 bg-transparent text-start text-base`}
        >
          {props.item.desc}
        </p>
      </div>
    </a>
  )
}
