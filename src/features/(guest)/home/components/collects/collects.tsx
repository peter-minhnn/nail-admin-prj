
interface CollectsProps {
  items: Array<string>
}
export default function Collects(props: Readonly<CollectsProps>) {
  if ((props.items ?? []).length == 0) return <div />
  return (
    <div className="pt-128px mb-[128px] flex h-screen w-full">
      <div className="flex h-full w-full overflow-hidden bg-cover">
        <img
          className="h-full w-full object-cover"
          src={props.items[0]}
        />
      </div>
      <div className="flex h-full w-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={props.items[1]}
        />
      </div>
    </div>
  );
}
