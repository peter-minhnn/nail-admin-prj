import { GuestPostDataType } from '@/entities/(guest)/post'

interface ServiceProps {
  item: GuestPostDataType
  height?: string
  imgheight?: string
}

export default function HomeItemService(props: Readonly<ServiceProps>) {
  return (
    <a href={`/dich-vus`}>
      <div className={`flex flex-col ${props.height} w-full`}>
        <div className='items-start text-start'>
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
