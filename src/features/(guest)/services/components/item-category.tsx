import { GuestAlbumDataType } from "@/entities/(guest)/album";

interface CategoryProps {
  data: GuestAlbumDataType;
  className?: string;
}

export default function ItemCatetory(props: Readonly<CategoryProps>) {
  return (
    <div className={`${props.className}`}>
      <div className="relative h-full w-full transition-transform duration-300 hover:scale-110">
        <div className={`rounded-sm bg-cover bg-center`}>
          <div className="absolute h-full w-full">
            <img
              src={props.data?.thumbnail}
              className="h-full w-full object-cover rounded "
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0 left-6 top-6 flex items-start justify-start text-2xl font-bold text-white">
            {props.data.name}
          </div>
          <div className="absolute inset-0 bottom-6 right-6 flex items-end justify-end">
            <img srcSet="images/svg/ic-arrow-right-white.svg"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
