import {
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useMemo,
  ReactElement,
} from 'react'
import { BaseResponseType } from '@/types'
import get from 'lodash/get'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { toast } from 'sonner'
import { cn } from '@/lib/utils.ts'
import { createQueryParams } from '@/utils/common.ts'
import { useAxios } from '@/hooks/use-axios.ts'

type QuillEditorProps = {
  className?: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  suppressUseFormRegister?: boolean
}

const QuillEditor = (props: Readonly<QuillEditorProps>) => {
  const { value, setValue, className, ...rest } = props

  const quillRef = useRef(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)

  // Quill modules configuration
  const modules = useMemo(() => {
    if (!isLayoutReady) return {}

    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['image', 'code-block', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ font: [] }],
          [{ align: [] }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }
  }, [isLayoutReady])

  // Handle image upload
  function imageHandler() {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (file) {
        try {
          // Create form data
          const formData = new FormData()
          formData.append('file', file)

          // Upload to server
          const response = await useAxios.upload<any, BaseResponseType, any>(
            '/file',
            formData
          )
          console.log('response', response)

          // Get the URL from server response
          const imageUrl = get(response, 'data.data.path', '')

          // Insert image into editor
          const editor = (quillRef.current! as any)?.getEditor()
          const range = editor.getSelection()
          const link = imageUrl
            ? `${import.meta.env.VITE_BASE_API_URL}/file${createQueryParams({ filePath: imageUrl })}`
            : ''
          editor.insertEmbed(range.index, 'image', link)
        } catch (error) {
          console.error('Image upload failed:', error)
          toast.error(' Failed to upload image: ' + error)
        }
      }
    }
  }

  // Handle editor content change
  const handleChange = (html: string) => {
    setValue(html)
  }

  const memoizedReactQuill: ReactElement | null = useMemo(() => {
    if (!isLayoutReady) return null

    return (
      <ReactQuill
        {...rest}
        ref={quillRef}
        theme='snow'
        value={value}
        defaultValue={value}
        onChange={handleChange}
        modules={modules}
        className='h-96 w-full'
      />
    )
  }, [value, modules])

  useEffect(() => {
    setIsLayoutReady(true)

    return () => setIsLayoutReady(false)
  }, [])

  return <div className={cn('', className)}>{memoizedReactQuill}</div>
}

export default QuillEditor
