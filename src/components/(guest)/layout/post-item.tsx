import { pagePublicRouters } from '@/entities/(guest)'
import { PostPublicType } from '@/entities/(guest)/post'

interface PostPublicItemProps {
  data?: PostPublicType
  className?: string
}

export default function PostPublicItemView(props: Readonly<PostPublicItemProps>) {
  if (props.data == null) return null;
  return (
    <div className={`${props.className}`}>
      <a href={`${pagePublicRouters.postDetail}/${props.data?.id}`}>
        <div className='relative h-full w-full transition-transform duration-300 hover:scale-110'>
          <div className={`rounded-sm bg-cover bg-center `}>
            <div className='absolute h-full w-full'>
              <img
                src={props.data?.thumbnail}
                className='h-full w-full rounded object-cover '
                alt=''
              />
            </div>
            <div className='absolute inset-0 bg-black bg-opacity-20'></div>
            <div className='absolute inset-0 left-6 top-6 flex items-start justify-start text-2xl font-bold text-white'>
              {props.data.title}
            </div>
            <div className='absolute inset-0 bottom-6 right-6 flex items-end justify-end'>
              <img srcSet='images/svg/ic-arrow-right-white.svg' alt='' />
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
