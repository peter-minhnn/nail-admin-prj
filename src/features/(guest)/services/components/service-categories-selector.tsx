import { useEffect, useState } from "react";
import ItemCatetory from "./item-category";
import { useGetAlbums } from "@/features/(guest)/hook/use-guest-queries";
import get from "lodash/get";
import { GuestAlbumDataType, GuestAlbumListSchema } from "@/entities/(guest)/album";
import { useIntl } from "react-intl";

export default function ServiceCategoriesSelector() {
  const intl = useIntl();

  const [albums, setAlbums] = useState<Array<GuestAlbumDataType>>([])

  const { data, status, isRefetching } = useGetAlbums()


  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    const bannersData = GuestAlbumListSchema.parse(list);
    setAlbums(bannersData);
  }, [data, status, isRefetching])

  return (
    <div className="h-fit w-screen gap-8">
      <div className="mx-16 flex-col">
        <div className="mb-8 grid min-h-screen lg:grid-cols-3 grid-cols-1 lg:min-h-[300px] gap-8">
          <div className="flex-1">
            <p className={`text-7xl philosopher-regular flex`}>{intl.formatMessage({ id: 'guest.common.service' })}</p>
          </div>
          {itemView(0, 'flex-1')}
          {itemView(1, 'flex-1')}
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 min-h-screen lg:min-h-[416px] w-full gap-8">
          <div className="flex h-full w-full flex-1">
            {albums.length < 3 ? (
              <div />
            ) : (
              <div className="flex flex-1 h-full w-full flex-col gap-6">
                {itemView(2)}
                {itemView(3)}
              </div>
            )}
          </div>
          {albums.length < 5 ? (
            <div />
          ) : (
            <div className="flex h-full w-full flex-1 gap-8">
              {itemView(4, 'flex-1')}
              {itemView(5, 'flex-1')}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function itemView(index: number, className?: string) {
    var item = albums[index];
    if (item == null) return <div></div>;
    return (
      <ItemCatetory className={`${className} w-full h-full`} data={item} />
    );
  }
}
