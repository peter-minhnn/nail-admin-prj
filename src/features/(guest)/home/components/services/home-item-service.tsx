import { GuestPostDataType } from '@/entities/(guest)/post';

interface ServiceProps {
  item: GuestPostDataType;
  height?: string;
  imgheight?: string;
}

export default function HomeItemService(props: Readonly<ServiceProps>) {
  return (
    <div
      className={`flex flex-col ${props.height} w-full`}
    >
      <div className="text-start items-start ">
        <img
          alt=''
          src={props.item.thumbnail}
          className={`w-full flex-1 rounded-sm aspect-square ${props.imgheight} object-cover transition-transform duration-300 hover:scale-110`}
        />
      </div>
      <p className={`roboto-regular mb-3 text-start mt-7 text-xl line-clamp-1`}>
        {props.item.title}
      </p>
      <div className={`roboto-light text-base text-start line-clamp-2 bg-transparent`} dangerouslySetInnerHTML={{ __html: props.item.content.replace("background-color", "") }} />
    </div>
  );
}
