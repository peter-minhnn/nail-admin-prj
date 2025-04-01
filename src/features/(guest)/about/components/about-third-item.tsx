import { AboutThirdItem } from "./about-third-section"

interface AboutThirdItemProps {
    item: AboutThirdItem
}

export default function AboutThirdItemView(props: Readonly<AboutThirdItemProps>) {
    return (
        <div className='flex sm:flex-row flex-col py-4'>
            <p className={`roboto-regular w-full md:w-2/5 text-xl`}>{props.item.title}</p>
            <hr className='border-t-1 md:mx-8 my-4 w-full md:w-1/5 border-[#A1A1AA]' />
            <div className='w-full md:w-2/5 flex-1'>
                <p
                    className={`roboto-light sm:line-clamp-8 line-clamp-6 text-base font-light`}
                >
                    {props.item.desctiption}
                </p>
            </div>
        </div>
    )
}