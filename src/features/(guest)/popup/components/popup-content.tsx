import { addAltToImages } from '@/utils/common'
import QuillEditor from '@/components/(admin)/quill-editor'
import { PopupDataType } from '@/features/(admin)/popup/data/schema'

type PopupContentProps = {
  popup: PopupDataType
}

export default function PopupContent(props: Readonly<PopupContentProps>) {
  return (
    <div className='flex flex-1 flex-col items-center gap-4 p-4'>
      <span className='font-philosopher text-3xl font-bold'>
        {props.popup.title}
      </span>
      <div className='custom-quill grid'>
        <QuillEditor
          value={addAltToImages(props.popup?.content ?? '')}
          readOnly
          hideToolbar
        />
      </div>
    </div>
  )
}
