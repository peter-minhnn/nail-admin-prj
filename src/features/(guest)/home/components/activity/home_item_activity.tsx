import Activity from '@/entities/(guest)/activity';
// import { Roboto } from 'next/font/google';

// const roboto = Roboto({
//   weight: '700',
//   subsets: ['latin'],
// });
// const robotoDescription = Roboto({
//   weight: '300',
//   subsets: ['latin'],
// });

interface ActivitiesProps {
  item: Activity;
  imgHeight?: string;
}
export default function HomeItemActivity(data: Readonly<ActivitiesProps>) {
  return (
    <div className="flex flex-col items-start justify-start transition-transform duration-300 hover:scale-110">
      <img
        className={`w-full ${data.imgHeight} object-cover`}
        srcSet={data.item.thumbnail}
      ></img>
      <h2 className={` mt-7`}>{data.item.title}</h2>
      <h3 className={` mt-3`}>
        {data.item.description}
      </h3>
    </div>
  );
}
