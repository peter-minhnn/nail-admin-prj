import { GuestPostDataType } from "@/entities/(guest)/post";

interface ActivitiesProps {
  item: GuestPostDataType;
  imgHeight?: string;
}
export default function HomeItemActivity(data: Readonly<ActivitiesProps>) {
  return (
    <div className="flex flex-col items-start justify-start  ">
      <img
        className={`w-full ${data.imgHeight} object-cover transition-transform duration-300 hover:scale-110 rounded-sm`}
        src={data.item.thumbnail}
      ></img>
      <div className=" flex-1 h-fit  mt-3">
        <h2 className={`roboto-bold text-start line-clamp-1`}>{data.item.title}</h2>
        <div className={`roboto-light  text-start  line-clamp-2 bg-transparent`} dangerouslySetInnerHTML={{ __html: data.item.content.replace("background-color", "") }} />
      </div>
    </div>
  );
}
