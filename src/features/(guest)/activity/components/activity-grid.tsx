import ActivityItem from "./activity-item";

export default function ActivitesGrid() {
    return <div className="grid grid-cols-3 grid-rows-2 gap-8 w-full h-fit mb-20">
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
    </div>
}