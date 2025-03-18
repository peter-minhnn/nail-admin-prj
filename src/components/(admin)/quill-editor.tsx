import {
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useMemo,
  ReactElement,
  useCallback,
} from 'react'
import { BaseResponseType } from '@/types'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { cn } from '@/lib/utils.ts'
import { useAuthAxios } from '@/hooks/use-axios.ts'

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

// Custom clipboard matcher to handle pasted images
const imageHandlerClipboard = (_: any, delta: any) => {
  // Return the delta as-is; we'll handle the image in the paste event
  return delta
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
  const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  // Upload image to server
  const uploadImage = useCallback(async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await useAuthAxios.postFormData<
        any,
        BaseResponseType,
        any
      >('/files', formData)
      return get(response, ['data', 'data', 'url'], '')
    } catch (error) {
      console.error('Image upload failed:', error)
      throw error
    }
  }, [])

  // Handle paste event for images
  const handlePaste = useCallback(
    async (e: any) => {
      const clipboardData = e.clipboardData
      const items = clipboardData.items

      for (const element of items) {
        if (element.type.indexOf('image') !== -1) {
          e.preventDefault() // Prevent default paste behavior
          const file = element.getAsFile()
          if (file) {
            setIsUploading(true)
            try {
              const imageUrl = await uploadImage(file)
              const editor = (quillRef.current! as any)?.getEditor()
              const range = editor.getSelection() || { index: 0 }
              editor.insertEmbed(range.index, 'image', imageUrl)
            } catch (error) {
              alert('Failed to upload pasted image')
            } finally {
              setIsUploading(false)
            }
          }
          break // Handle only one image per paste
        }
      }
    },
    [uploadImage]
  )

  // Handle image upload from toolbar button
  const imageHandler = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (file) {
        setIsUploading(true)
        try {
          const imageUrl = await uploadImage(file)
          const editor = (quillRef.current! as any)?.getEditor()
          const range = editor.getSelection() || { index: 0 }
          editor.insertEmbed(range.index, 'image', imageUrl)
        } catch (error) {
          alert('Failed to upload image')
        } finally {
          setIsUploading(false)
        }
      }
    }
  }, [uploadImage])

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
        clipboard: {
          matchers: [['img', imageHandlerClipboard]], // Custom matcher for clipboard
        },
      },
    }
  }, [isLayoutReady, hideToolbar])

  // Handle editor content change
  const handleChange = (html: string) => {
    setValue?.(html)
    onChange?.(html)
  }

  const memoizedReactQuill: ReactElement | null = useMemo(() => {
    if (!isLayoutReady) return null

    return (
      <>
        {isUploading && <div>Uploading image...</div>}
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
  }, [value, modules, hasError, helperText, isUploading])

  useEffect(() => {
    setIsLayoutReady(true)

    return () => setIsLayoutReady(false)
  }, [])

  // Register paste event listener when component mounts
  useEffect(() => {
    if (quillRef.current && isLayoutReady) {
      const editor = (quillRef.current as any)?.getEditor()
      editor.root.addEventListener('paste', handlePaste)

      // Cleanup listener on unmount
      return () => {
        editor.root.removeEventListener('paste', handlePaste)
      }
    }
  }, [handlePaste, isLayoutReady])

  return <div className={cn('', className)}>{memoizedReactQuill}</div>
}

export default QuillEditor
