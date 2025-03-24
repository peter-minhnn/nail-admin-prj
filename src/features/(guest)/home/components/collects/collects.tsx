
interface CollectsProps {
  items: string
}
export default function Collects(props: Readonly<CollectsProps>) {
  return (
    <div className="pt-128px mb-[128px] flex h-screen w-full">
      <div className="flex h-full w-full overflow-hidden bg-cover">
        <img
          className="h-full w-full object-cover"
          srcSet="images/collect_1.png"
          alt="cover"
        />
      </div>
      <div className="flex h-full w-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          srcSet="images/collect_2.png"
          alt="cover"
        />
      </div>
    </div>
  );
}
