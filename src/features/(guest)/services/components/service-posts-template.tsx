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
      <div className='flex flex-col sm:mx-16'>
        <div className={`mb-8 flex w-full flex-col gap-8 md:flex-row`}>
          <p
            className={`${(props.hasLabel ?? true) ? 'flex md:flex-1' : 'hidden'} philosopher-regular pb-8 text-center text-7xl md:h-[300px]`}
          >
            {intl.formatMessage({ id: 'guest.common.service' })}
          </p>

          <AlbumPublicItemView
            className={`flex h-[416px] md:h-[300px] md:flex-1`}
            data={props.items[0]}
          />
          <AlbumPublicItemView
            className={`flex h-[416px] md:h-[300px] md:flex-1`}
            data={props.items[1]}
          />
        </div>
        <div className='flex flex-col gap-8 md:flex-row'>
          <div
            className={`${props.items.length > 2 ? 'flex' : 'hidden'} ${props.items.length == 4 ? 'flex-row' : 'flex-col'} h-fit gap-8 md:h-[416px] md:flex-1`}
          >
            <AlbumPublicItemView
              className={`h-[416px] md:flex md:flex-1`}
              data={props.items[2]}
            />
            <AlbumPublicItemView
              className={`h-[416px] md:flex md:flex-1`}
              data={props.items[3]}
            />
          </div>
          <div
            className={`${props.items.length > 4 ? 'flex' : 'hidden'} flex-col gap-8 md:h-[416px] md:flex-1 md:flex-row`}
          >
            <AlbumPublicItemView
              className={`flex h-[416px] md:flex-1`}
              data={props.items[4]}
            />
            <AlbumPublicItemView
              className={`flex h-[416px] md:flex-1`}
              data={props.items[5]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
