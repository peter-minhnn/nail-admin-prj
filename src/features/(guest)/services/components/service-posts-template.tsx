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
      <div className='mx-6 flex-col sm:mx-16'>
        <div
          className={`row-span-7 mb-8 grid grid-cols-1 gap-8 lg:min-h-[300px] ${(props.hasLabel ?? true) ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}
        >
          <p
            className={`${(props.hasLabel ?? true) ? 'flex' : 'hidden'} philosopher-regular row-span-1 text-7xl`}
          >
            {intl.formatMessage({ id: 'guest.common.service' })}
          </p>
          <AlbumPublicItemView
            className={`row-span-3 h-full w-full`}
            data={props.items[0]}
          />
          <AlbumPublicItemView
            className={`row-span-3 h-full w-full`}
            data={props.items[1]}
          />
        </div>
        <div
          className={`grid min-h-screen w-full grid-cols-1 gap-8 lg:min-h-[416px] ${props.items.length < 5 ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}
        >
          <div className='flex h-full w-full flex-1'>
            {props.items.length < 3 ? (
              <div />
            ) : props.items.length > 2 && props.items.length < 5 ? (
              <div className='flex w-full flex-col gap-6 lg:h-[416px] lg:flex-row'>
                <AlbumPublicItemView
                  className={`h-full w-full`}
                  data={props.items[2]}
                />
                <AlbumPublicItemView
                  className={`h-full w-full`}
                  data={props.items[3]}
                />
              </div>
            ) : (
              <div className='flex h-full w-full flex-1 flex-col gap-6'>
                <AlbumPublicItemView
                  className={`h-full w-full`}
                  data={props.items[2]}
                />
                <AlbumPublicItemView
                  className={`h-full w-full`}
                  data={props.items[3]}
                />
              </div>
            )}
          </div>
          {props.items.length < 5 ? null : (
            <div className='flex h-full w-full flex-1 flex-col gap-8 lg:flex-row'>
              <AlbumPublicItemView
                className={`h-full w-full`}
                data={props.items[4]}
              />
              <AlbumPublicItemView
                className={`h-full w-full`}
                data={props.items[5]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
