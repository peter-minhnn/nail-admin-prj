import { PostPublicType } from '@/entities/(guest)/post'
import ActivityItem from './activity-item'

interface ActivitiesProps {
  items: Array<PostPublicType>
}
export default function ActivitiesGrid(data: Readonly<ActivitiesProps>) {
  return (
    <div className='mb-20 mt-20 grid h-fit w-full grid-cols-1 grid-rows-2 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {data.items.map((e) => {
        return <ActivityItem key={e.id} item={e} />
      })}
    </div>
  )
}
