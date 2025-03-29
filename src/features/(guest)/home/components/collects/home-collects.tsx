import Button from "@/components/(guest)/layout/button";
import { menuRoutes } from "@/entities/(guest)";
import { useIntl } from "react-intl";

export default function HomeCollects() {
  const intl = useIntl();
  return (
    <div className="grid md:grid-cols-2 sm:h-screen w-full mt-10 mb-20">
      <div className="flex h-full w-full overflow-hidden bg-cover">
        <img
          className="h-full w-full object-cover"
          srcSet="/images/homepage_footer_1.png" alt=""
        />
      </div>
      <div className="flex flex-col h-full w-full overflow-hidden bg-[#EFE5D2] items-center justify-center">
        <p className="philosopher-regular text-7xl">BỘ SƯU TẬP</p>
        <p className="philosopher-regular text-7xl text-[#E48E43]">DEJÀ VU</p>
        <img
          className="w-1/2 h-1/2 object-contain my-7"
          srcSet="/images/hompage_footer_2.png" alt=""
        />
        <a href={menuRoutes.products}>
          <Button title={intl.formatMessage({
            id: 'guest.common.more',
          })} />
        </a>
      </div>
    </div>
  );
}
