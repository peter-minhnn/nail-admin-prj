import Service from '@/entities/(guest)/service';
import { Roboto } from 'next/font/google';

interface ServiceProps {
  item: Service;
  height?: string;
  imgheight?: string;
}
// const roboto = Roboto({
//   weight: '700',
//   subsets: ['latin'],
// });
// const roboto300 = Roboto({
//   weight: '300',
//   subsets: ['latin'],
// });
export default function HomeItemService(props: Readonly<ServiceProps>) {
  return (
    <div
      className={`flex flex-col ${props.height} w-full transition-transform duration-300 hover:scale-110`}
    >
      <div className="">
        <img
          srcSet={props.item.thumbnail}
          className={`w-full flex-1 rounded-sm ${props.imgheight} object-cover`}
        />
      </div>
      <p className={` mb-3 mt-7 text-xl`}>
        {props.item.title}
      </p>
      <p className={`text-base`}>
        {props.item.description}
      </p>
    </div>
  );
}
