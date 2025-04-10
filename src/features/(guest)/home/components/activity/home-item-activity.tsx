import { useNavigate } from '@tanstack/react-router'
import { pagePublicRouters } from '@/entities/(guest)/routes'
import { PostPublicType } from '@/types/(guest)'
import { usePostsStore } from '@/stores/posts-store.ts'
import { cn } from '@/lib/utils'
import { stringToSlug } from '@/utils/common.ts'

interface ActivitiesProps {
  item?: PostPublicType
  className?: string
}
export default function HomeItemActivity(props: Readonly<ActivitiesProps>) {
  const navigate = useNavigate()
  const { setPostsItem } = usePostsStore()

  const handleClick = () => {
    if (props.item == null) return
    const slugId = stringToSlug(props.item.title)
    setPostsItem({ ...props.item, slugId })
    navigate({
      to: `${pagePublicRouters.postDetail}/${slugId}`,
    }).finally()
  }

  if (props.item == null) return <div />
  return (
    <button type='button' onClick={handleClick} className='w-full'>
      <div className='w-full items-start justify-start'>
        <div className={cn('h-full w-full overflow-hidden', props.className)}>
          <img
            className={
              'h-full w-full rounded-sm object-cover transition-transform duration-300 hover:scale-110'
            }
            src={props.item.thumbnail}
            alt=''
          />
        </div>
        <div className='mt-3 h-fit flex-1'>
          <h2 className={`roboto-bold line-clamp-1 text-start`}>
            {props.item.title}
          </h2>
          <div
            className={`roboto-light line-clamp-2 bg-transparent text-start`}
            dangerouslySetInnerHTML={{
              __html: props.item.content.replace('background-color', ''),
            }}
          />
        </div>
      </div>
    </button>
  )
}
