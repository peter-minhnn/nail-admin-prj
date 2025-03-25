import { BannerDataType, bannersListSchema } from '@/entities/(guest)/banner';
import { useGetBanners } from '@/features/(admin)/posts/hooks/use-guest-queries';
import { BannerFilterParams } from '@/types/banners.type';
import get from 'lodash/get';
import { useEffect, useState } from 'react';


export default function ServiceBanner() {

  const [filterParams] = useState<BannerFilterParams>({
    type: 3,
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
    <div className='h-screen w-screen items-center justify-center pt-20'>
      <div className=" absolute flex w-full h-full gap-64 items-center  ">
        <div className="mx-16 flex h-full w-[192px] items-end pb-32">
          {itemBanner(0)}
        </div>
        <div className="mt-24 flex h-fit w-fit flex-1 justify-center pb-32">
          {itemBanner(1)}
        </div>
        <div className="mr-16 mt-16 flex h-full w-[192px]">
          {itemBanner(2)}
        </div>
      </div>
      <div className="absolute flex w-screen flex-col items-center justify-center">
        <p className={`text-8xl text-[#000000] philosopher-regular`}>
          Dich Vu
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
    var itemSize = "h-[288px] w-full";
    if (index == 1) {
      itemSize = "h-[584px] w-[416px]"
    }
    return <img
      src={item.url}
      className={`object-cover rounded ${itemSize}`}
    />; screenLeft
  }
}
