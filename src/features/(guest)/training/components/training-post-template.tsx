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
    <div className='h-fit flex flex-col gap-8'>
      <div className='md:h-[812px] h-fit flex flex-col md:flex-row gap-8'>
        <div className={`${props.items.length > 2 ? "md:w-1/3" : "w-full"} flex flex-col gap-8`}>
          <PostPublicItemView data={props.items[0]} className={`${itemMobileH}  md:h-full`} />
          <PostPublicItemView data={props.items[1]} className={`${itemMobileH}  md:h-full`} />
        </div>
        <PostPublicItemView data={props.items[2]} className={`${itemMobileH} md:h-full md:flex md:flex-1`} />
      </div>
      <div className='md:h-[800px] h-fit flex flex-col gap-8 '>
        <div className={`flex md:flex-1 md:flex-row flex-col gap-8 `} >
          <PostPublicItemView data={props.items[3]} className={`${itemMobileH} md:h-full md:flex md:flex-1`} />
          <PostPublicItemView data={props.items[4]} className={`${itemMobileH} md:h-full md:flex md:flex-1`} />
        </div>

        <PostPublicItemView data={props.items[5]} className={`${itemMobileH} md:flex md:flex-1 bg-blue-500`} />

      </div>
    </div>
  )
}
