import { useEffect, useState } from 'react'
import {
  GuestAlbumDataType,
  GuestAlbumListSchema,
} from '@/entities/(guest)/album'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import { useGetAlbums } from '@/features/(guest)/hook/use-guest-queries'
import ItemCatetory from '../../services/components/item-category'

export default function TrainingIndustries() {
  const [albums, setAlbums] = useState<Array<GuestAlbumDataType>>([])

  const { data, status, isRefetching } = useGetAlbums()

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    const bannersData = GuestAlbumListSchema.parse(list)
    setAlbums(bannersData)
  }, [data, status, isRefetching])

  if (albums.length == 0) return <div />
  const intl = useIntl()
  return (
    <div className='mb-64 h-fit w-screen'>
      <div className='h-[591px] w-full items-center justify-center'>
        <div className='absolute mt-[200px] flex h-full w-full flex-col items-center px-20 lg:px-72'>
          <p className={`philosopher-regular mb-7 text-center text-7xl`}>
            {intl.formatMessage({ id: 'training.industry' })}
          </p>
          <p className={`roboto-regular text-center text-base`}>
            {intl.formatMessage({ id: 'training.industryDescription' })}
          </p>
        </div>
        <img
          srcSet='/images/training_eclipse_orange.png'
          className='h-full w-full object-contain'
          alt=''
        />
      </div>

      <div className='grid h-[872px] grid-cols-1 grid-rows-2 gap-8 px-20 lg:grid-cols-2 lg:grid-rows-1 lg:px-44'>
        <div className='grid max-h-[872px] grid-rows-2 flex-col gap-8'>
          {itemView(0)}
          {itemView(1)}
        </div>
        {itemView(2)}
      </div>

      <div className='mt-8 grid h-[350px] w-screen grid-cols-1 gap-8 px-20 lg:grid-cols-2 lg:px-44'>
        {itemView(3, 'flex-1')}
        {itemView(4, 'flex-1')}
      </div>
      <div className='mt-8 h-[416px] w-full px-20 lg:px-44'>{itemView(5)}</div>
    </div>
  )

  function itemView(index: number, className?: string) {
    var item = albums[index]
    if (item == null) return <div></div>
    return <ItemCatetory className={`${className} h-full w-full`} data={item} />
  }
}
