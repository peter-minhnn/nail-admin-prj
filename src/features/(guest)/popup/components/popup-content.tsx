import QuillEditor from "@/components/(admin)/quill-editor"
import { PopupDataType } from "@/features/(admin)/popup/data/schema"
import { addAltToImages } from "@/utils/common"

type PopupContentProps = {
    popup: PopupDataType
}

export default function PopupContent(props: Readonly<PopupContentProps>) {
    return (<div className="flex flex-1 flex-col p-4 items-center gap-4 ">
        <span className="font-bold text-3xl font-philosopher">{props.popup.title}</span>
        <div className='custom-quill grid '>
            <QuillEditor
                value={addAltToImages(props.popup?.content ?? '')}
                readOnly
                hideToolbar
            />
        </div>
    </div>
    )
}