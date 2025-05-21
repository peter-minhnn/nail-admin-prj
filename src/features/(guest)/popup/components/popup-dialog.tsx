import { useEffect, useState } from "react";
import { useGetPopupsPublished } from "@/features/(admin)/popup/hooks/use-queries";
import { PopupDataType } from "@/features/(admin)/popup/data/schema";
import { usePopupStore } from "@/stores/popup-store";


export default function PopupDialog() {

    const [popupsData, setPopups] = useState<PopupDataType>()

    const { data, status, isRefetching } = useGetPopupsPublished()

    const [doNotShowToday, setDoNotShowToday] = useState(false);

    const skipToDay = usePopupStore((s) => s.skipToDay)
    const closePopup = usePopupStore((s) => s.closePopup)

    const handleClose = () => {
        closePopup();
    }

    const handleSkipShowToday = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setDoNotShowToday(e.target.checked)
        const isSkip: boolean = e.target.checked as boolean;
        skipToDay(isSkip)
    }

    useEffect(() => {
        if (status === 'pending' || isRefetching) return
        if (data?.data) {
            setPopups(data?.data)
        }
    }, [data, status, isRefetching])

    if (popupsData == null) return null;
    return ((
        <div className="fixed z-[9999] inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center ">
            <div className="bg-white p-[2px] rounded-[20px]  overflow-hidden " style={{ width: '30vw', height: '40vw' }}>
                <div className="w-full h-full flex gap-1 flex-col rounded-[20px] overflow-hidden">
                    <div className="flex flex-1 " >
                        <img src={popupsData.image ?? ""} alt="image" className="w-auto h-auto " />
                    </div>
                    <div className="h-[60px] flex flex-row ">
                        <div className="flex flex-1 bg-gray-50 items-center px-3 gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    id="doNotShow"
                                    type="checkbox"
                                    checked={doNotShowToday}
                                    onChange={handleSkipShowToday}
                                    className="peer hidden"
                                />
                                <div className="w-5 h-5 border-2 border-grey-500 peer-checked:border-orange-500 rounded-sm flex items-center justify-center peer-checked:bg-orange-500">
                                    <svg
                                        className="peer-checked:block w-5 h-5 text-white"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <span className="text-xs md:text-xs lg:text-base font-roboto">
                                    Không hiển thị lại trong hôm nay
                                </span>
                            </label>
                        </div>

                        <button
                            className="flex w-[60px] bg-orange-500 items-center justify-center hover:bg-orange-700 "
                            onClick={handleClose}>
                            <img src="/images/svg/ic-close.svg" alt="btnClose" className="w-fit h-fit" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ));

}