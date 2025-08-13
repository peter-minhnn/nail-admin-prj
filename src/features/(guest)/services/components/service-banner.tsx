import { useEffect, useState } from 'react'
import { BannerPublicDataType, BannerPublicFilterParams } from '@/types/(guest)'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import { useGetBanners } from '@/hooks/use-guest-queries.ts'
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
    const bannersData = data as BannerPublicDataType[]
    setBanners(bannersData)
  }, [data, status, isRefetching])
  return (
    <div className='relative flex h-screen items-center justify-center bg-cover bg-center sm:h-screen md:items-start md:justify-center'>
      <div className='absolute flex flex-1 flex-col justify-center px-5 py-32 md:items-center'>
        <p
          className={`philosopher-regular text-center text-6xl text-[#000000] md:text-7xl lg:text-8xl`}
        >
          {intl.formatMessage({ id: 'guest.common.service' })}
        </p>
        <div className='flex w-full flex-col items-center md:flex-row'>
          <p
            className={`philosopher-regular text-center text-6xl text-[#E48E43] md:text-7xl lg:text-8xl`}
          >
            DEJÀ VU NAILS
          </p>
          <p
            className={`philosopher-regular mx-6 text-4xl text-[#E48E43] md:text-7xl lg:text-8xl`}
          >
            &
          </p>
          <p
            className={`philosopher-regular text-6xl text-[#E48E43] md:text-7xl lg:text-8xl`}
          >
            SPA
          </p>
        </div>
      </div>
      <div className='flex h-full min-w-full items-center'>
        <div className='flex h-full w-full items-end lg:mx-16 lg:w-[192px] lg:py-32'>
          <ServiceBannerItem
            className='h-full w-full lg:h-[288px]'
            item={banners?.[0]}
          />
        </div>
        <div className='mx-16 mt-24 hidden h-fit w-fit flex-1 pb-32 pt-20 lg:block'>
          <div className='flex h-full w-full items-center justify-center'>
            <ServiceBannerItem
              className='h-[584px] w-[416px]'
              item={banners?.[1]}
            />
          </div>
        </div>
        <div className='mx-16 my-16 hidden h-full w-[192px] pt-20 lg:block'>
          <ServiceBannerItem
            className='h-full w-full lg:h-[288px]'
            item={banners?.[2]}
          />
        </div>
      </div>
    </div>
  )
}
