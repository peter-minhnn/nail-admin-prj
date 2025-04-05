import { PostPublicType } from '@/entities/(guest)/post'
import PostPublicItemView from '@/components/(guest)/layout/post-item'

interface TrainingPostTemplateProps {
  items: PostPublicType[]
}

export default function TrainingPostTemplate(
  props: Readonly<TrainingPostTemplateProps>
) {
  return (
    <div>
      <div
        className={`grid h-[872px] ${props.items.length >= 3 ? 'grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1' : ''} gap-8 px-6 lg:px-44`}
      >
        <div className='grid max-h-[872px] flex-col gap-8'>
          <PostPublicItemView data={props.items[0]} />
          <PostPublicItemView data={props.items[1]} />
        </div>
        <PostPublicItemView data={props.items[2]} />
      </div>

      <div
        className={`mt-8 grid h-[350px] w-screen gap-8 px-6 ${props.items.length == 4 ? 'grid-cols-1 lg:grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} lg:px-44 ${props.items.length < 4 ? 'hidden' : 'flex'}`}
      >
        <PostPublicItemView data={props.items[3]} />
        <PostPublicItemView data={props.items[4]} />
      </div>
      {
        <PostPublicItemView
          className='mt-8 h-[416px] w-full px-6 lg:px-44'
          data={props.items[5]}
        />
      }
    </div>
  )
}
