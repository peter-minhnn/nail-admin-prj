import { useEffect, useState } from 'react'
import {
  BannerDataType,
  bannersListSchema,
  BannerFilterParams,
} from '@/entities/(guest)/banner'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'

export default function ServiceBanner() {
  const intl = useIntl()
  const [filterParams] = useState<BannerFilterParams>({
    type: 2,
    take: 10,
    page: 1,
  })

  const [banners, setBanners] = useState<Array<BannerDataType>>([])

  const { data, status, isRefetching } = useGetBanners(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    const bannersData = bannersListSchema.parse(list)
    setBanners(bannersData)
  }, [data, status, isRefetching])
  return (
    <div className='w-screen items-center justify-center pt-20'>
      <div className='absolute flex h-full min-w-full items-center'>
        <div className='flex h-full w-full items-end md:py-32 lg:mx-16 lg:w-[192px]'>
          {itemBanner(0)}
        </div>
        <div className='mx-16 mt-24 hidden h-fit w-fit flex-1 pb-32 lg:block'>
          <div className='flex h-full w-full items-center justify-center'>
            {itemBanner(1)}
          </div>
        </div>
        <div className='mx-16 my-16 hidden h-full w-[192px] lg:block'>
          {itemBanner(2)}
        </div>
      </div>
      <div className='absolute flex w-screen flex-col items-center justify-center'>
        <p className={`philosopher-regular text-8xl text-[#000000]`}>
          {intl.formatMessage({ id: 'guest.common.service' })}
        </p>
        <p className={`philosopher-regular text-8xl text-[#E48E43]`}>
          DEJÀ VU NAL & SPA
        </p>
      </div>
    </div>
  )

  function itemBanner(index: number) {
    var item = banners[index]
    if (item == null) return <div />
    var itemSize = 'h-full lg:h-[288px] w-full'
    if (index == 1) {
      itemSize = 'h-[584px] w-[416px]'
    }
    return (
      <img
        src={item.url}
        alt=''
        className={`rounded object-cover ${itemSize}`}
      />
    )
    screenLeft
  }
}
