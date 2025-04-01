import { BannerPublicDataType, BannerPublicFilterParams } from '@/entities/(guest)/banner';
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries';
import get from 'lodash/get';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import ServiceBannerItem from './service-banner-item';


export default function ServiceBanner() {
  const intl = useIntl();
  const [filterParams] = useState<BannerPublicFilterParams>({
    type: 2,
    take: 10,
    page: 1
  })

  const [banners, setBanners] = useState<Array<BannerPublicDataType>>([])

  const { data, status, isRefetching } = useGetBanners(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    const bannersData: BannerPublicDataType[] = list;
    setBanners(bannersData);
  }, [data, status, isRefetching])
  return (
    <div className='absolute h-[80vh] bg-cover bg-center sm:h-screen w-screen items-center justify-center '>
      <div className="absolute flex min-w-full h-full  items-center ">
        <div className="flex lg:mx-16 h-full  w-full lg:w-[192px] items-end lg:py-32">
          <ServiceBannerItem className='h-full lg:h-[288px] w-full' item={banners[0]} />
        </div>
        <div className="hidden lg:block mt-24  h-fit w-fit flex-1 pb-32 mx-16 pt-20 ">
          <div className='flex w-full h-full items-center justify-center'>
            <ServiceBannerItem className='h-[584px] w-[416px]' item={banners[1]} />
          </div></div>
        <div className="hidden lg:block mx-16 my-16 h-full w-[192px] pt-20">
          <ServiceBannerItem className='h-full lg:h-[288px] w-full' item={banners[2]} />
        </div>
      </div>
      <div className="absolute flex w-screen flex-col md:items-center justify-center pt-20">
        <p className={`text-8xl text-[#000000] philosopher-regular`}>
          {intl.formatMessage({ id: 'guest.common.service' })}
        </p>
        <p className={`text-8xl text-[#E48E43] philosopher-regular `}>
          DEJÀ VU NAL & SPA
        </p>
      </div>
    </div>
  );
}