
interface AboutThirdItem {
  title?: string;
  desctiption: string;
}
interface AboutThirdSectionProps {
  items: Array<AboutThirdItem>;
}

export default function AboutThirdSection(
  props: Readonly<AboutThirdSectionProps>
) {
  return (
    <div className="min-h-screen">
      <div className="my-32 h-fit w-fit flex-col">
        <div className="flex h-[228px] w-screen">
          <div className="flex w-screen justify-center">
            <img srcSet="/images/about_us_5.png" className="h-full w-[416px]" />
          </div>
          <div className="absolute flex h-[228px] w-screen items-center truncate">
            <p className={`text-8xl philosopher-regular`}>
              VU NAIL & SPA DEJÀ VU NAIL & SPA DEJÀ VU NAIL & SPA DEJÀ VU NAIL &
              SPA
            </p>
          </div>
        </div>

        <div className="w-full flex-1 items-center justify-center py-32">
          <div className="absolute w-full flex-1">
            <img srcSet="/images/dejavu-hidden.png" className="w-full" />
          </div>
          <div className="absolute flex flex-1 items-center justify-center">
            <div className=" lg:w-1/2 w-full lg:px-0 px-20 ">
              {props.items.map((item) => {
                return itemVIew(item);
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function itemVIew(item: AboutThirdItem) {
    return (
      <div className="flex py-4">
        <p className={`text-xl roboto-regular w-1/5`}>{item.title}</p>
        <hr className="border-t-1 mx-8 w-1/5 border-[#A1A1AA]" />
        <div className="flex-1 w-2/5">
          <p className={`roboto-light  text-base font-light sm:line-clamp-8 line-clamp-6`}>
            {item.desctiption}
          </p>
        </div>
      </div>
    );
  }
}
