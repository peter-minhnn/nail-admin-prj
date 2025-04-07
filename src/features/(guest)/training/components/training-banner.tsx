import { useEffect, useState } from 'react'
import { BannerPublicDataType, BannerPublicFilterParams } from '@/types/(guest)'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries'

export default function TrainingBanner() {
  const [filterParams] = useState<BannerPublicFilterParams>({
    type: 3,
    take: 10,
    page: 1,
  })

  const [banners, setBanners] = useState<Array<BannerPublicDataType>>([])

  const { data, status, isRefetching } = useGetBanners(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const bannersData: BannerPublicDataType[] = get(data, ['data'], [])
    setBanners(bannersData)
  }, [data, status, isRefetching])

  const intl = useIntl()

  return (
    <div className='flex h-full w-full bg-[#EFE5D2]'>
      <div className='flex h-full w-full flex-col justify-between pb-16 pl-16 pr-8 pt-32'>
        <div className={`philosopher-regular text-7xl`}>
          <p>
            {intl.formatMessage({ id: 'training' })}
            <br />
            {intl.formatMessage({ id: 'training.student' })}
          </p>
        </div>
        <div className='flex h-fit w-full items-end'>
          <div className='flex h-full w-full flex-1 flex-col justify-end'>
            <p className={`roboto-regular text-base`}>
              {intl.formatMessage({ id: 'training.joinWithUs' })}
            </p>
            <p className={`philosopher-regular py-2 text-5xl text-[#E48E43]`}>
              DEJÀ VU NAIL & SPA
            </p>
            <p className={`roboto-regular break-all text-justify text-base`}>
              {intl.formatMessage({ id: 'training.now' })}
            </p>
          </div>
          <div className='flex h-[288px] w-[192px]'>
            {' '}
            <img
              src={banners[0]?.url ?? ''}
              className='h-full w-full object-cover'
              alt=''
            />
          </div>
        </div>
      </div>
      <div className='hidden h-full w-full flex-col lg:block'>
        <img
          src={banners[1]?.url ?? ''}
          className='h-full w-full object-cover'
          alt=''
        />
      </div>
    </div>
  )
}
