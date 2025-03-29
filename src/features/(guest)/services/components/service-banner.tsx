import { BannerDataType, bannersListSchema, BannerFilterParams } from '@/entities/(guest)/banner';
import { useGetBanners } from '@/features/(guest)/hook/use-guest-queries';
import get from 'lodash/get';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';


export default function ServiceBanner() {
  const intl = useIntl();
  const [filterParams] = useState<BannerFilterParams>({
    type: 2,
    take: 10,
    page: 1
  })

  const [banners, setBanners] = useState<Array<BannerDataType>>([])

  const { data, status, isRefetching } = useGetBanners(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    const bannersData = bannersListSchema.parse(list);
    setBanners(bannersData);
  }, [data, status, isRefetching])
  return (
    <div className='w-screen items-center justify-center pt-20'>
      <div className="absolute flex min-w-full h-full  items-center ">
        <div className=" flex lg:mx-16 h-full  w-full lg:w-[192px] items-end md:py-32">
          {itemBanner(0)}
        </div>
        <div className="hidden lg:block mt-24  h-fit w-fit flex-1 pb-32 mx-16 ">
          <div className='flex w-full h-full items-center justify-center'>
            {itemBanner(1)}
          </div></div>
        <div className="hidden lg:block mx-16 my-16 h-full w-[192px]">
          {itemBanner(2)}
        </div>
      </div>
      <div className="absolute flex w-screen flex-col items-center justify-center">
        <p className={`text-8xl text-[#000000] philosopher-regular`}>
          {intl.formatMessage({ id: 'guest.common.service' })}
        </p>
        <p className={`text-8xl text-[#E48E43] philosopher-regular `}>
          DEJÀ VU NAL & SPA
        </p>
      </div>
    </div>
  );

  function itemBanner(index: number) {
    var item = banners[index];
    if (item == null) return <div />
    var itemSize = "h-full lg:h-[288px] w-full";
    if (index == 1) {
      itemSize = "h-[584px] w-[416px]"
    }
    return <img
      src={item.url}
      alt=''
      className={`object-cover rounded ${itemSize}`}
    />; screenLeft
  }
}
