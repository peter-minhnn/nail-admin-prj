import { useNavigate } from '@tanstack/react-router'
import { pagePublicRouters } from '@/entities/(guest)/routes'
import { PostPublicType } from '@/types/(guest)'
import { useIntl } from 'react-intl'
import { usePostsStore } from '@/stores/posts-store.ts'
import { stringToSlug } from '@/utils/common.ts'

interface ActivityItemProps {
  item: PostPublicType
}
export default function ActivityItem(props: Readonly<ActivityItemProps>) {
  const intl = useIntl()
  const navigate = useNavigate()
  const { setPostsItem } = usePostsStore()

  const handleClick = () => {
    const slutId = stringToSlug(props.item.title)
    setPostsItem({ ...props.item, slugId: slutId })
    navigate({
      to: `${pagePublicRouters.postDetail}/${slutId}`,
    }).finally()
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className='group flex h-full w-full flex-col'
      title='Activity Item'
    >
      <div className='flex h-full w-full flex-col'>
        <div className='h-full w-full overflow-hidden sm:h-[460px]'>
          <img
            src={props.item.thumbnail}
            alt=''
            className='h-[460px] w-full rounded object-cover transition-transform duration-300 group-hover:scale-110'
          />
        </div>
        <p className='roboto-bold mb-3 mt-7 text-left text-xl'>
          {props.item.title}
        </p>
        <div className='flex w-full flex-1'>
          <p
            className='roboto-light mb-3 line-clamp-3 text-left text-base'
            dangerouslySetInnerHTML={{
              __html: props.item.content.replace('background-color', ''),
            }}
          />
        </div>
        <div className='flex w-full flex-row items-end justify-between'>
          <p className='roboto-regular text-xl group-hover:text-[#E48E43]'>
            {intl.formatMessage({ id: 'guest.common.more' })}
          </p>
          <img
            srcSet='/images/svg/ic-arrow-read-more.svg'
            alt=''
            className='h-8 w-8 rotate-45 transition-transform duration-300 group-hover:rotate-0'
          />
        </div>
      </div>
    </button>
  )
}
