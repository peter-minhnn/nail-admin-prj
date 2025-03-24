

import Activity from '@/entities/(guest)/activity';
import HomeItemActivity from './home_item_activity';
import Button from '@/components/(guest)/layout/button';
import { useIntl } from 'react-intl'

// const philospher = Philosopher({
//   weight: '400',
//   subsets: ['latin'],
// });

interface HomeActivitiesProps {
  items?: Array<Activity>;
}
export default function HomeActivities(props: Readonly<HomeActivitiesProps>) {
  // const intl = useIntl()

  return (
    <div className="h-screen w-full grid-cols-2 bg-[#F2F1ED]">
      <div className="mx-16 grid h-screen grid-cols-2 grid-rows-2 gap-8 pb-32 pt-16">
        <div className="flex flex-col items-start justify-start pb-[130px]">
          <h3
            className={` pb-[68px] text-[72px] font-normal`}
          >
            Hoạt động
          </h3>
          <div className="flex h-full w-full items-end justify-start">
            {/* <Button title={intl.formatMessage({
              id: 'homeGuest.more',
            })} /> */}
          </div>
        </div>
        {renderAtIndex(0)}
        {renderAtIndex(1)}
        <div className="flex h-full w-full gap-4">
          {renderAtIndex(2)}
          {renderAtIndex(3)}
        </div>
      </div>
    </div>
  );

  function renderAtIndex(index: number) {
    var item = (props.items ?? [])[index];
    return <HomeItemActivity item={item} imgHeight="h-[240px]" />;
  }
}
