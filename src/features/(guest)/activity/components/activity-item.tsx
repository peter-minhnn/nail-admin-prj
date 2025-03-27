import { GuestPostDataType } from "@/entities/(guest)/post";

interface ActivityItemProps {
    item: GuestPostDataType
}
export default function ActivityItem(props: Readonly<ActivityItemProps>) {
    return (<div className="w-full h-full ">
        <img src={props.item.thumbnail} className="h-[460px] w-full object-cover rounded" />
        <p className="roboto-bold mt-7 mb-3 text-xl">{props.item.title}</p>
        <p className=" flex-1 mb-3 roboto-light text-base line-clamp-3" dangerouslySetInnerHTML={{ __html: props.item.content.replace("background-color", "") }} />
        <div className="flex w-full items-center justify-between">
            <p className="roboto-regular text-xl">Xem them </p>
            <img srcSet="/images/svg/arrow_right.svg" />
        </div>
    </div>)
}