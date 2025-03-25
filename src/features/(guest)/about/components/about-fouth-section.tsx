interface AboutFouthProps {
  items: Array<string>;
}

export default function AboutFouthSection(props: Readonly<AboutFouthProps>) {
  return (
    <div className="flex h-screen w-screen gap-[32px] bg-[#F2F1ED] px-16 pb-20 pt-32">
      {props.items.map((item) => {
        return (
          <div className="flex h-full w-full">
            <img
              src={item}
              className="h-[460px] w-full rounded-sm object-cover"
            ></img>
          </div>
        );
      })}
    </div>
  );
}
