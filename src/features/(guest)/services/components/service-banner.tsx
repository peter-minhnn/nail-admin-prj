import { useEffect, useState } from 'react'
import {
  BannerPublicDataType,
  BannerPublicFilterParams,
} from '@/entities/(guest)/banner'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'
import ServiceBannerItem from './service-banner-item'

export default function ServiceBanner() {
  const intl = useIntl()
  const [filterParams] = useState<BannerPublicFilterParams>({
    type: 2,
    take: 10,
    page: 1,
  })

  const [banners, setBanners] = useState<Array<BannerPublicDataType>>([])

  const { data, status, isRefetching } = useGetBanners(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    const bannersData: BannerPublicDataType[] = list
    setBanners(bannersData)
  }, [data, status, isRefetching])
  return (
    <div className='absolute h-[80vh] w-screen items-center justify-center bg-cover bg-center sm:h-screen'>
      <div className='absolute flex h-full min-w-full items-center'>
        <div className='flex h-full w-full items-end lg:mx-16 lg:w-[192px] lg:py-32'>
          <ServiceBannerItem
            className='h-full w-full lg:h-[288px]'
            item={banners[0]}
          />
        </div>
        <div className='mx-16 mt-24 hidden h-fit w-fit flex-1 pb-32 pt-20 lg:block'>
          <div className='flex h-full w-full items-center justify-center'>
            <ServiceBannerItem
              className='h-[584px] w-[416px]'
              item={banners[1]}
            />
          </div>
        </div>
        <div className='mx-16 my-16 hidden h-full w-[192px] pt-20 lg:block'>
          <ServiceBannerItem
            className='h-full w-full lg:h-[288px]'
            item={banners[2]}
          />
        </div>
      </div>
      <div className='absolute flex w-screen flex-col justify-center pt-20 md:items-center'>
        <p className={`philosopher-regular text-8xl text-[#000000]`}>
          {intl.formatMessage({ id: 'guest.common.service' })}
        </p>
        <p className={`philosopher-regular text-8xl text-[#E48E43]`}>
          DEJÀ VU NAL & SPA
        </p>
      </div>
    </div>
  )
}
