import { PopupDataType } from "@/features/(admin)/popup/data/schema"

type PopupImageProps = {
    popup: PopupDataType
}

export default function PopupImage(props: Readonly<PopupImageProps>) {
    return (<img
        src={props.popup.image ?? ''}
        alt=''
        className='h-full w-full'
    />)
}