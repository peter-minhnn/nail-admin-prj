import { GuestPostDataType } from '@/entities/(guest)/post'

interface ActivityItemProps {
  item: GuestPostDataType
}
export default function ActivityItem(props: Readonly<ActivityItemProps>) {
  return (
    <div className='h-full w-full'>
      <img
        src={props.item.thumbnail}
        alt=''
        className='h-[460px] w-full rounded object-cover transition-transform duration-300 hover:scale-110'
      />
      <p className='roboto-bold mb-3 mt-7 text-xl'>{props.item.title}</p>
      <p
        className='roboto-light mb-3 line-clamp-3 flex-1 text-base'
        dangerouslySetInnerHTML={{
          __html: props.item.content.replace('background-color', ''),
        }}
      />
      <div className='flex w-full items-center justify-between'>
        <p className='roboto-regular text-xl'>Xem them </p>
        <img srcSet='/images/svg/arrow_right.svg' alt='' />
      </div>
    </div>
  )
}
