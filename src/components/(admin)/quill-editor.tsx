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

/**
 * QuillEditor Component
 *
 * A rich text editor with support for:
 * - Text formatting (bold, italic, headers, etc.)
 * - Image upload (max 10MB)
 * - Video upload (max 150MB)
 * - Video URL insertion
 * - Clipboard paste support for images
 */
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

type UploadState = {
  isUploading: boolean
  uploadType: 'image' | 'video' | null
  progress?: number
}

// Custom clipboard matcher to handle pasted images and videos
const mediaHandlerClipboard = (_: unknown, delta: unknown) => {
  // Return the delta as-is; we'll handle the media in the paste event
  return delta
}
// File size limits (in MB)
const FILE_SIZE_LIMITS = {
  IMAGE: 10, // 10MB for images
  VIDEO: 150, // 150MB for videos
} as const

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
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    uploadType: null,
  })

  // Validate file size
  const validateFileSize = useCallback(
    (file: File, maxSizeMB: number = 150) => {
      const maxSize = maxSizeMB * 1024 * 1024 // Convert MB to bytes
      if (file.size > maxSize) {
        const currentSizeMB = (file.size / (1024 * 1024)).toFixed(2)
        throw new Error(
          `File size must be less than ${maxSizeMB}MB. Current size: ${currentSizeMB}MB`
        )
      }
      return true
    },
    []
  )

  // Upload file to server (images and videos)
  const uploadFile = useCallback(async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await useAuthAxios.postFormData<
        unknown,
        BaseResponseType,
        FormData
      >('/files', formData)
      return get(response, ['data', 'data', 'url'], '')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('File upload failed:', error)
      throw error
    }
  }, [])

  // Insert media into editor
  const insertMedia = useCallback((url: string, type: 'image' | 'video') => {
    const editor = (
      quillRef.current! as {
        getEditor: () => {
          getSelection: () => { index: number } | null
          insertEmbed: (index: number, type: string, url: string) => void
          insertText: (
            index: number,
            text: string,
            attributes?: Record<string, unknown>
          ) => void
        }
      }
    )?.getEditor()
    if (!editor) return

    const range = editor.getSelection() ?? { index: 0 }

    if (type === 'image') {
      editor.insertEmbed(range.index, 'image', url)
      editor.insertText(range.index + 1, '', { alt: '' })
    } else if (type === 'video') {
      editor.insertEmbed(range.index, 'video', url)
      editor.insertText(range.index + 1, '', { alt: '' })
    }
  }, [])

  // Handle paste event for images and videos
  const handlePaste = useCallback(
    async (e: ClipboardEvent) => {
      const clipboardData = e.clipboardData
      const items = clipboardData?.items

      if (!items) return

      for (const element of items) {
        if (uploadState.isUploading) break

        if (element.type.indexOf('image') !== -1) {
          e.preventDefault() // Prevent default paste behavior
          const file = element.getAsFile()
          if (file) {
            try {
              // Validate pasted image file size
              validateFileSize(file, FILE_SIZE_LIMITS.IMAGE)

              setUploadState({ isUploading: true, uploadType: 'image' })
              const fileUrl = await uploadFile(file)
              insertMedia(fileUrl, 'image')
            } catch (error) {
              if (error instanceof Error) {
                alert(error.message)
              } else {
                alert('Failed to upload pasted image')
              }
            } finally {
              setUploadState({ isUploading: false, uploadType: null })
            }
          }
          break // Handle only one media per paste
        }
      }
    },
    [uploadState.isUploading, uploadFile, insertMedia, validateFileSize]
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
        try {
          // Validate image file size
          validateFileSize(file, FILE_SIZE_LIMITS.IMAGE)

          setUploadState({ isUploading: true, uploadType: 'image' })
          const fileUrl = await uploadFile(file)
          insertMedia(fileUrl, 'image')
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message)
          } else {
            alert('Failed to upload image')
          }
        } finally {
          setUploadState({ isUploading: false, uploadType: null })
        }
      }
    }
  }, [uploadFile, insertMedia, validateFileSize])

  // Handle video upload from toolbar button
  const videoHandler = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'video/*')
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (file) {
        try {
          // Validate video file size
          validateFileSize(file, FILE_SIZE_LIMITS.VIDEO)

          setUploadState({ isUploading: true, uploadType: 'video' })
          const fileUrl = await uploadFile(file)
          insertMedia(fileUrl, 'video')
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message)
          } else {
            alert('Failed to upload video')
          }
        } finally {
          setUploadState({ isUploading: false, uploadType: null })
        }
      }
    }
  }, [uploadFile, insertMedia, validateFileSize])

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
          ['image', 'video', 'code-block', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ font: [] }],
          [{ align: [] }],
        ],
        handlers: {
          image: imageHandler,
          video: videoHandler,
        },
        clipboard: {
          matchers: [['img', mediaHandlerClipboard]], // Custom matcher for clipboard
        },
      },
    }
  }, [isLayoutReady, hideToolbar, imageHandler, videoHandler])

  // Handle editor content change
  const handleChange = useCallback(
    (html: string) => {
      setValue?.(html)
      onChange?.(html)
    },
    [setValue, onChange]
  )

  // Custom video formats for Quill
  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'image',
      'video',
      'code-block',
      'blockquote',
      'list',
      'bullet',
      'color',
      'background',
      'script',
      'font',
      'align',
      'link',
      'clean',
    ],
    []
  )

  const memoizedReactQuill: ReactElement | null = useMemo(() => {
    if (!isLayoutReady) return null

    return (
      <>
        {uploadState.isUploading && (
          <div className='mb-2 rounded border border-blue-200 bg-blue-50 p-2 text-sm text-blue-700'>
            Uploading {uploadState.uploadType}...
          </div>
        )}

        <ReactQuill
          {...rest}
          ref={quillRef}
          theme='snow'
          value={value}
          defaultValue={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          className={cn('w-full', { '!border !border-red-500': hasError })}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {helperText && (
          <p className='mt-1 text-sm text-red-500'>
            <FormattedMessage id={helperText} />
          </p>
        )}
      </>
    )
  }, [
    value,
    modules,
    formats,
    hasError,
    helperText,
    uploadState,
    hideToolbar,
    handleChange,
    isLayoutReady,
    rest,
    placeholder,
    readOnly,
  ])

  useEffect(() => {
    setIsLayoutReady(true)

    return () => setIsLayoutReady(false)
  }, [])

  // Register paste event listener when component mounts
  useEffect(() => {
    if (quillRef.current && isLayoutReady) {
      const editor = (
        quillRef.current as { getEditor: () => { root: HTMLElement } }
      )?.getEditor()
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
