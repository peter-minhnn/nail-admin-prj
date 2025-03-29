import { BannerDataType, bannersListSchema } from "@/entities/(guest)/banner";
import { useGetBanners } from "@/features/(guest)/hook/use-guest-queries";
import { BannerFilterParams } from "@/types/banners.type";
import get from "lodash/get";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

export default function TrainingBanner() {

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

  const intl = useIntl()

  return (
    <div className="flex h-full w-full bg-[#EFE5D2]">
      <div className="flex h-full w-full flex-col justify-between pb-16 pl-16 pr-8 pt-32">
        <div className={`text-7xl philosopher-regular`}>
          <p>
            {intl.formatMessage({ id: "training" })}
            <br />
            {intl.formatMessage({ id: "training.student" })}
          </p>
        </div>
        <div className="flex h-fit w-full items-end">
          <div className="flex h-full w-full flex-1 flex-col justify-end">
            <p className={`text-base roboto-regular `}>
              {intl.formatMessage({ id: "training.joinWithUs" })}
            </p>
            <p
              className={`py-2 text-5xl text-[#E48E43] philosopher-regular`}
            >
              DEJÀ VU NAIL & SPA
            </p>
            <p className={`text-base roboto-regular `}>
              {intl.formatMessage({ id: "training.now" })}
            </p>
          </div>
          <div className="flex h-[288px] w-[192px]">{renderBanner(0)}</div>
        </div>
      </div>
      <div className="hidden lg:block h-full w-full flex-col">{renderBanner(1)}</div>
    </div>
  );

  function renderBanner(index: number) {
    if (banners.length == 0) return <div />;
    var item = banners[index];
    if (item == null) return <div />;
    return (
      <img
        src={banners[index].url ?? ""}
        className="h-full w-full object-cover"
        alt=""
      />
    );
  }
}
