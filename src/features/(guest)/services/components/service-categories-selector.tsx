import { useEffect, useState } from 'react'
import {
  GuestAlbumDataType,
  GuestAlbumListSchema,
} from '@/entities/(guest)/album'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import { useGetAlbums } from '@/features/(guest)/hook/use-guest-queries'
import ItemCatetory from './item-category'

export default function ServiceCategoriesSelector() {
  const intl = useIntl()

  const [albums, setAlbums] = useState<Array<GuestAlbumDataType>>([])

  const { data, status, isRefetching } = useGetAlbums()

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    const bannersData = GuestAlbumListSchema.parse(list)
    setAlbums(bannersData)
  }, [data, status, isRefetching])

  return (
    <div className='h-fit w-screen gap-8'>
      <div className='mx-16 flex-col'>
        <div className='mb-8 grid min-h-screen grid-cols-1 gap-8 lg:min-h-[300px] lg:grid-cols-3'>
          <div className='flex-1'>
            <p className={`philosopher-regular flex text-7xl`}>
              {intl.formatMessage({ id: 'guest.common.service' })}
            </p>
          </div>
          {itemView(0, 'flex-1')}
          {itemView(1, 'flex-1')}
        </div>
        <div className='grid min-h-screen w-full grid-cols-1 gap-8 lg:min-h-[416px] lg:grid-cols-2'>
          <div className='flex h-full w-full flex-1'>
            {albums.length < 3 ? (
              <div />
            ) : (
              <div className='flex h-full w-full flex-1 flex-col gap-6'>
                {itemView(2)}
                {itemView(3)}
              </div>
            )}
          </div>
          {albums.length < 5 ? (
            <div />
          ) : (
            <div className='flex h-full w-full flex-1 gap-8'>
              {itemView(4, 'flex-1')}
              {itemView(5, 'flex-1')}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  function itemView(index: number, className?: string) {
    var item = albums[index]
    if (item == null) return <div></div>
    return <ItemCatetory className={`${className} h-full w-full`} data={item} />
  }
}
