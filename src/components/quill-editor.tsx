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
import { FormattedMessage } from 'react-intl'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { toast } from 'sonner'
import { cn } from '@/lib/utils.ts'
import { useAxios } from '@/hooks/use-axios.ts'

type QuillEditorProps = {
  className?: string
  value: string
  setValue?: Dispatch<SetStateAction<string>>
  suppressUseFormRegister?: boolean
  placeholder?: string
  hasError?: boolean
  helperText?: string
  onChange?: (value: string) => void
  readOnly?: boolean
  hideToolbar?: boolean
}

const QuillEditor = (props: Readonly<QuillEditorProps>) => {
  const {
    value,
    setValue,
    className,
    hasError,
    helperText,
    placeholder,
    suppressUseFormRegister,
    onChange,
    readOnly,
    hideToolbar,
    ...rest
  } = props

  const quillRef = useRef(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)

  // Quill modules configuration
  const modules = useMemo(() => {
    if (!isLayoutReady || hideToolbar) {
      return {
        toolbar: false,
      }
    }

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
  }, [isLayoutReady, hideToolbar])

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
          const response = await useAxios.postFormData<
            any,
            BaseResponseType,
            any
          >('/files', formData)
          console.log('response', response)

          // Get the URL from server response
          const imageUrl = get(response, ['data', 'data', 'url'], '')

          // Insert image into editor
          const editor = (quillRef.current! as any)?.getEditor()
          const range = editor.getSelection()
          editor.insertEmbed(range.index, 'image', imageUrl)
        } catch (error) {
          console.error('Image upload failed:', error)
          toast.error(' Failed to upload image: ' + error)
        }
      }
    }
  }

  // Handle editor content change
  const handleChange = (html: string) => {
    setValue?.(html)
    onChange?.(html)
  }

  const memoizedReactQuill: ReactElement | null = useMemo(() => {
    if (!isLayoutReady) return null

    return (
      <>
        <ReactQuill
          {...rest}
          ref={quillRef}
          theme='snow'
          value={value}
          defaultValue={value}
          onChange={handleChange}
          modules={modules}
          className={cn('w-full', { '!border !border-red-500': hasError })}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {hasError && (
          <p className='mt-1 text-sm text-red-500'>
            <FormattedMessage id={helperText} />
          </p>
        )}
      </>
    )
  }, [value, modules, hasError, helperText])

  useEffect(() => {
    setIsLayoutReady(true)

    return () => setIsLayoutReady(false)
  }, [])

  return <div className={cn('', className)}>{memoizedReactQuill}</div>
}

export default QuillEditor
