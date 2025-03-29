interface AboutFouthProps {
  items: Array<string>;
}

export default function AboutFouthSection(props: Readonly<AboutFouthProps>) {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 min-h-screen w-screen gap-[32px] bg-[#F2F1ED] px-16 pb-20 pt-32 item-">
      {props.items.map((item) => {
        return (
          <div className="flex-1 aspect-square">
            <img
              alt=""
              src={item}
              className="h-full w-full rounded-sm object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
