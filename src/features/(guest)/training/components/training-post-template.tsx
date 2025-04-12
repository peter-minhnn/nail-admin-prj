import { PostPublicType } from '@/types/(guest)'
import PostPublicItemView from '@/components/(guest)/post-item.tsx'

interface TrainingPostTemplateProps {
  items: PostPublicType[]
}

export default function TrainingPostTemplate(
  props: Readonly<TrainingPostTemplateProps>
) {
  const itemMobileH = 'h-[416px]'
  return (
    <div className='flex h-fit flex-col gap-8'>
      <div className='flex h-fit flex-col gap-8 md:h-[812px] md:flex-row'>
        <div
          className={`${props.items.length > 2 ? 'md:w-1/3' : 'w-full'} flex flex-col gap-8`}
        >
          <PostPublicItemView
            data={props.items[0]}
            className={`${itemMobileH} md:h-full`}
          />
          <PostPublicItemView
            data={props.items[1]}
            className={`${itemMobileH} md:h-full`}
          />
        </div>
        <PostPublicItemView
          data={props.items[2]}
          className={`${itemMobileH} md:flex md:h-full md:flex-1`}
        />
      </div>
      <div className='flex h-fit flex-col gap-8 md:h-[800px]'>
        <div className={`flex flex-col gap-8 md:flex-1 md:flex-row`}>
          <PostPublicItemView
            data={props.items[3]}
            className={`${itemMobileH} md:flex md:h-full md:flex-1`}
          />
          <PostPublicItemView
            data={props.items[4]}
            className={`${itemMobileH} md:flex md:h-full md:flex-1`}
          />
        </div>

        <PostPublicItemView
          data={props.items[5]}
          className={`${itemMobileH} bg-blue-500 md:flex md:flex-1`}
        />
      </div>
    </div>
  )
}
