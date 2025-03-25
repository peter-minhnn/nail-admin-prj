import { GuestPostDataType } from "@/entities/(guest)/post";

export default function ActivityItem() {
    return (<div className="w-full h-full ">
        <img src="/images/aboutus_section2_1.png" className="h-[460px] w-full object-cover rounded" />
        <p className="roboto-bold mt-7 mb-3 text-xl">LOREM IPSUM DOLOR SIT AMET</p>
        <p className=" flex-1 mb-3 roboto-light text-base">Sed platea platea class vivamus; adipiscing orci. Aenean maecenas platea justo interdum sociosqu suspendisse consequat nibh porttitor.</p>
        <div className="flex w-full items-center justify-between">
            <p className="roboto-regular text-xl">Xem them </p>
            <img srcSet="/images/svg/arrow_right.svg" />
        </div>
    </div>)
}