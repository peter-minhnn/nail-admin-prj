
interface AboutSecondsSectionProps {
  mainImage: string;
  subImage: string;
  title?: string;
  description?: string;
}

export default function AboutSecondsSection(
  props: Readonly<AboutSecondsSectionProps>
) {
  return (
    <div className="h-screen w-full grid md:grid-cols-2 sm:h-screen">
      <div className="flex h-full w-full overflow-hidden bg-cover">
        <img
          className="h-full w-full object-cover"
          src={props.mainImage}
          alt="cover"
        />
      </div>
      <div className="flex h-full w-full flex-col overflow-hidden bg-[#DFDAD4] p-16">
        <div className="flex h-full w-full flex-col items-end lg:items-end  sm:items-center overflow-hidden lg:p-16 md:p-4">
          <div className=" lg:w-1/3 w-1/5 md:w-1/2">
            <img
              src={props.subImage}
              className="h-full w-full rounded-sm object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="h-full flex-1 flex-col items-center justify-center lg:px-[64px]">
          <p className={`text-start lg:text-7xl text-4xl philosopher-regular`}>
            {props.title}
          </p>
          <p className={`text-start lg:text-xl text-lg philosopher-regular line-clamp-4`}>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
}
