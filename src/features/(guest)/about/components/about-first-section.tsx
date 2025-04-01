import AboutFirstImageItem from "./about-first-image-item";

interface AboutFirstSectionProps {
  images: Array<string>;
  title?: string;
  description?: string;
}

export default function AboutFirstSection(
  props: Readonly<AboutFirstSectionProps>
) {
  return (
    <div className="h-fit w-screen px-8 bg-[#F2F1ED] py-32">
      <div className="flex h-[428px] flex-1 justify-center gap-36 ">
        <div className="flex lg:gap-x-36 md:gap-x-10 gap-x-5 justify-center ">
          {props.images.map((_, index) => {
            return <AboutFirstImageItem index={index} image={props.images[index]} />;
          })}
        </div>
      </div>
      <div className="flex min-h-[250px] w-full flex-col items-center justify-center ">
        <div className="flex h-fit md:w-1/2 w-full flex-col items-center justify-center">
          <p className={`text-7xl philosopher-regular mb-5`}>
            {props.title}
          </p>
          <p className={`text-base philosopher-regular font-light`}>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  )
}
