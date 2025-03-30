import { GuestPostDataType } from '@/entities/(guest)/post'

interface ActivitiesProps {
  item: GuestPostDataType
  imgHeight?: string
}
export default function HomeItemActivity(data: Readonly<ActivitiesProps>) {
  return (
    <div className='w-full flex-col items-start justify-start'>
      <img
        className={`w-full ${data.imgHeight} rounded-sm object-cover transition-transform duration-300 hover:scale-110`}
        src={data.item.thumbnail}
        alt=''
      />
      <div className='mt-3 h-fit flex-1'>
        <h2 className={`roboto-bold line-clamp-1 text-start`}>
          {data.item.title}
        </h2>
        <div
          className={`roboto-light line-clamp-2 bg-transparent text-start`}
          dangerouslySetInnerHTML={{
            __html: data.item.content.replace('background-color', ''),
          }}
        />
      </div>
    </div>
  )
}
