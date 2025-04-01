import { BannerPublicDataType } from "@/entities/(guest)/banner";

interface ServiceBannerItemProps {
    className?: string,
    item?: BannerPublicDataType,
}

export default function ServiceBannerItem(props: Readonly<ServiceBannerItemProps>) {
    if (props.item == null) return <div />
    return <img
        src={props.item.url}
        alt=''
        className={`object-cover rounded ${props.className ?? "w-full h-full"}`}
    />;
}