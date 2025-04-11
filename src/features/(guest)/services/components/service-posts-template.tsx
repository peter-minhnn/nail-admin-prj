import { PostPublicType } from '@/types/(guest)'
import { useIntl } from 'react-intl'
import AlbumPublicItemView from '@/components/(guest)/post-item.tsx'

interface ServicePostsTemplate {
  hasLabel: boolean
  items: PostPublicType[]
}

export default function ServicePostsTemplate(
  props: Readonly<ServicePostsTemplate>
) {
  const intl = useIntl()
  return (
    <div className='h-fit gap-8'>
      <div className='mx-6 flex flex-col sm:mx-16 '>
        <div
          className={`mb-8 flex flex-col md:flex-row w-full gap-8`}>
          <p
            className={`${(props.hasLabel ?? true) ? 'flex md:flex-1' : 'hidden'}  philosopher-regular  text-center text-7xl md:h-[300px] pb-8`}
          >
            {intl.formatMessage({ id: 'guest.common.service' })}
          </p>

          <AlbumPublicItemView
            className={`flex h-[416px] md:flex-1 md:h-[300px]`}
            data={props.items[0]}
          />
          <AlbumPublicItemView
            className={`flex h-[416px] md:flex-1 md:h-[300px]`}
            data={props.items[1]}
          />
        </div>
        <div className=' flex flex-col md:flex-row gap-8'>
          <div className={`${props.items.length > 2 ? "flex" : "hidden"} ${props.items.length == 4 ? "flex-row" : "flex-col"} md:flex-1  md:h-[416px] h-fit gap-8`}>
            <AlbumPublicItemView
              className={`md:flex-1 md:flex h-[416px]`}
              data={props.items[2]}
            />
            <AlbumPublicItemView
              className={`md:flex-1 md:flex h-[416px]`}
              data={props.items[3]}
            />
          </div>
          <div className={`${props.items.length > 4 ? "flex" : "hidden"} md:flex-1 md:h-[416px]  flex-col md:flex-row gap-8`}>
            <AlbumPublicItemView
              className={`md:flex-1 flex h-[416px]`}
              data={props.items[4]}
            />
            <AlbumPublicItemView
              className={`md:flex-1 flex h-[416px]`}
              data={props.items[5]}
            />
          </div>
        </div>
      </div>
    </div >
  )
}
