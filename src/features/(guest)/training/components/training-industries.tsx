
import { useIntl } from 'react-intl';
import { useEffect, useState } from "react";
import { useGetAlbums } from "@/features/(guest)/hook/use-guest-queries";
import get from "lodash/get";
import { GuestAlbumDataType, GuestAlbumListSchema } from "@/entities/(guest)/album";

import ItemCatetory from '../../services/components/item-category';
export default function TrainingIndustries() {

  const [albums, setAlbums] = useState<Array<GuestAlbumDataType>>([])

  const { data, status, isRefetching } = useGetAlbums()

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    const bannersData = GuestAlbumListSchema.parse(list);
    setAlbums(bannersData);
  }, [data, status, isRefetching])


  if (albums.length == 0) return <div />;
  const intl = useIntl()

  return (
    <div className="h-fit w-screen">
      <div className="h-[591px] w-full items-center justify-center">
        <div className="absolute mt-[200px] flex h-full w-full flex-col items-center px-72">
          <p className={`mb-7 text-7xl philosopher-regular`}>
            {intl.formatMessage({ id: "training.industry" })}
          </p>
          <p className={`roboto-regular text-center text-base`}>
            {intl.formatMessage({ id: "training.industryDescription" })}
          </p>
        </div>
        <img
          srcSet="/images/training_eclipse_orange.png"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="mx-44 flex h-[872px] gap-8">
        <div className="flex max-h-[872px] w-1/3 flex-col gap-8">
          {itemView(3, 'flex-1')}
          {itemView(4, 'flex-1')}
        </div>
        {itemView(2, 'flex-1')}
      </div>

      <div className="mt-8 flex h-[350px] w-screen gap-8 px-44">
        {itemView(3, 'flex-1')}
        {itemView(4, 'flex-1')}
      </div>
      <div className="mb- mt-8 h-[416px] w-full px-44">{itemView(5)}</div>
    </div>
  );

  function itemView(index: number, className?: string) {
    var item = albums[index];
    if (item == null) return <div></div>;
    return (
      <ItemCatetory className={`${className} h-full w-full`} data={item} />
    );
  }
}
