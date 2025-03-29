import { GuestPostDataType } from "@/entities/(guest)/post";
import ActivityItem from "./activity-item";

interface ActivitiesProps {
    items: Array<GuestPostDataType>
}
export default function ActivitesGrid(data: Readonly<ActivitiesProps>) {
    return <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-3 md:grid-cols-2 gap-8 w-full h-fit mb-20 mt-20 ">
        {(data.items.map((e) => {
            return <ActivityItem item={e} />
        }))}
    </div>
}