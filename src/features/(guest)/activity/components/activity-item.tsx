import { PostPublicType } from '@/entities/(guest)/post'
import { pagePublicRouters } from '@/entities/(guest)/routes';
import { useIntl } from 'react-intl'

interface ActivityItemProps {
  item: PostPublicType
}
export default function ActivityItem(props: Readonly<ActivityItemProps>) {
  const intl = useIntl();
  return (
    <a href={`${pagePublicRouters.postDetail}/${props.item.id}`} className='flex flex-col h-full w-full'>
      <div className='flex flex-col h-full w-full'>
        <img
          src={props.item.thumbnail}
          alt=''
          className='h-[460px] w-full rounded object-cover transition-transform duration-300 hover:scale-110'
        />
        <p className='roboto-bold mb-3 mt-7 text-xl'>{props.item.title}</p>
        <div className='flex-1 flex w-full'>
          <p
            className='roboto-light mb-3 line-clamp-3  text-base'
            dangerouslySetInnerHTML={{
              __html: props.item.content.replace('background-color', ''),
            }}
          />
        </div>
        <div className='flex flex-row w-full items-end justify-between'>
          <p className='roboto-regular text-xl'>{intl.formatMessage({ id: "guest.common.more" })}</p>
          <img srcSet='/images/svg/arrow_right.svg' alt='' />
        </div>
      </div>
    </a>
  )
}
