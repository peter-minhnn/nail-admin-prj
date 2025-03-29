
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
            return renderItem(index);
          })}
        </div>
      </div>
      <div className="flex max-h-[250px] w-full flex-col items-center justify-center">
        <div className="flex h-full md:w-1/2 w-full flex-col items-center justify-center">
          <p className={`text-7xl philosopher-regular mb-5`}>
            {props.title}
          </p>
          <p className={`text-base philosopher-regular font-light`}>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );

  function renderItem(index: number) {
    var mt = '';
    switch (index) {
      case 0:
        mt = 'mt-36';
        break;
      case 1:
        break;
      case 2:
        mt = 'mt-[80px]';
        break;
      case 3:
        mt = 'mt-[145px]';
        break;
    }

    return (
      <div className={`flex h-[281px] w-full bg-red-500 ${mt}`}>
        <img
          className="h-full w-full rounded-sm object-cover "
          src={props.images[index]}
          alt=""
        />
      </div>
    );
  }
}
