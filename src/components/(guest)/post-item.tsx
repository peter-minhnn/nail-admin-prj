import { useNavigate } from '@tanstack/react-router'
import { pagePublicRouters } from '@/entities/(guest)'
import { PostPublicType } from '@/types/(guest)'
import { usePostsStore } from '@/stores/posts-store.ts'
import { stringToSlug } from '@/utils/common.ts'

interface PostPublicItemProps {
  data?: PostPublicType
  className?: string
}

export default function PostPublicItemView(
  props: Readonly<PostPublicItemProps>
) {
  const { setPostsItem } = usePostsStore()
  const navigate = useNavigate()

  if (props.data == null) return null
  return (
    <div className={`${props.className} h-full w-full`}>
      <button
        type='button'
        onClick={() => {
          setPostsItem(props.data! ?? null)
          navigate({
            href: `${pagePublicRouters.postDetail}/${stringToSlug(props.data?.title!)}`,
          }).finally()
        }}
        className='h-full w-full'
        name='Posts Detail'
      >
        <div className='group relative h-full w-full'>
          <div className={`rounded-sm bg-cover bg-center`}>
            <div className='absolute h-full w-full'>
              <img
                src={props.data?.thumbnail}
                className='h-full w-full rounded object-cover'
                alt=''
              />
            </div>
            <div className='absolute inset-0 bg-black bg-opacity-20'></div>
            <div className='relative inset-0 left-6 top-6 flex h-full w-full items-start justify-start overflow-hidden'>
              <p className='text-2xl font-bold text-white transition-all duration-300 group-hover:translate-x-4 group-hover:translate-y-0'>
                {' '}
                {props.data.title}
              </p>
            </div>
            <div className='absolute inset-0 bottom-6 right-6 flex items-end justify-end transition-transform duration-300 hover:scale-90'>
              <img
                srcSet='/images/svg/ic-arrow-right-white.svg'
                alt=''
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
