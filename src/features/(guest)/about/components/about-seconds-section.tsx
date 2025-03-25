
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
    <div className="flex h-screen w-full">
      <div className="flex h-full w-full overflow-hidden bg-cover">
        <img
          className="h-full w-full object-cover"
          src={props.mainImage}
          alt="cover"
        />
      </div>
      <div className="flex h-full w-full flex-col overflow-hidden bg-[#DFDAD4] p-[64px]">
        <div className="flex h-full w-full flex-col items-end overflow-hidden p-16">
          <div className="h-[240px] w-[192px]">
            <img
              src={props.subImage}
              className="h-full w-full rounded-sm object-cover"
            />
          </div>
        </div>
        <div className="h-full flex-1 flex-col items-center justify-center px-[64px]">
          <p className={`text-start text-7xl philosopher-regular`}>
            {props.title}
          </p>
          <p className={`text-start text-xl philosopher-regular`}>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
}
