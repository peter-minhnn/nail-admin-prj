import { PostPublicType } from '@/entities/(guest)/post'
import { pagePublicRouters } from '@/entities/(guest)/routes'

interface ServiceProps {
  item: PostPublicType
  height?: string
  imgheight?: string
}

export default function HomeItemService(props: Readonly<ServiceProps>) {
  return (
    <a href={`${pagePublicRouters.postDetail}/${props.item.id}`}>
      <div className={`flex flex-col ${props.height} w-[416px]`}>
        <div className='items-start text-start w-full  overflow-hidden'>
          <img
            alt=''
            src={props.item.thumbnail}
            className={`aspect-square w-full flex-1 rounded-sm ${props.imgheight} object-cover transition-transform duration-300 hover:scale-110`}
          />
        </div>
        <p
          className={`roboto-regular mb-3 mt-7 line-clamp-1 text-start text-xl`}
        >
          {props.item.title}
        </p>
        <div
          className={`roboto-light line-clamp-2 bg-transparent text-start text-base`}
          dangerouslySetInnerHTML={{
            __html: props.item.content.replace('background-color', ''),
          }}
        />
      </div>
    </a>
  )
}
