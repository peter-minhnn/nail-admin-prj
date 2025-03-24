import Service from '@/entities/(guest)/service';

interface ServiceProps {
  item: Service;
  height?: string;
  imgheight?: string;
}

export default function HomeItemService(props: Readonly<ServiceProps>) {
  return (
    <div
      className={`flex flex-col ${props.height} w-full`}
    >
      <div className="text-start items-start">
        <img
          src={props.item.thumbnail}
          className={`w-full flex-1 rounded-sm ${props.imgheight} object-cover transition-transform duration-300 hover:scale-110`}
        />
      </div>
      <p className={`roboto-regular mb-3 text-start mt-7 text-xl`}>
        {props.item.title}
      </p>
      <p className={`roboto-light text-base text-start`}>
        {props.item.description}
      </p>
    </div>
  );
}
