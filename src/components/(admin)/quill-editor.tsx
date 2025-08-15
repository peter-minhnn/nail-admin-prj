import {
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useMemo,
  ReactElement,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { deleteFile } from '@/services/upload.service.ts'
import { BaseResponseType } from '@/types'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { cn } from '@/lib/utils.ts'
import { useAuthAxios } from '@/hooks/use-axios.ts'
import './quill-editor.css'

/**
 * QuillEditor Component
 *
 * A rich text editor with support for:
 * - Text formatting (bold, italic, headers, etc.)
 * - Image upload (max 10MB)
 * - Video upload (max 150MB)
 * - Video URL insertion
 * - Clipboard paste support for images
 * - Automatic cleanup of uploaded files when not saved
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
  onUploadedFilesChange?: (files: string[]) => void
}

export type QuillEditorRef = {
  cleanupAllUploadedFiles: () => Promise<void>
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

const QuillEditor = forwardRef<QuillEditorRef, QuillEditorProps>(
  (props, ref) => {
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
      onUploadedFilesChange,
      ...rest
    } = props

    const quillRef = useRef(null)
    const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false)
    const [uploadState, setUploadState] = useState<UploadState>({
      isUploading: false,
      uploadType: null,
    })
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

    // Extract filename from URL for deletion
    const extractFilenameFromUrl = useCallback((url: string): string => {
      try {
        const urlObj = new URL(url)
        const pathname = urlObj.pathname
        const filename = pathname.split('/').pop()
        return filename || ''
      } catch {
        // If URL parsing fails, try to extract filename from the end of the string
        const parts = url.split('/')
        return parts[parts.length - 1] || ''
      }
    }, [])

    // Add file to uploaded files tracking
    const addUploadedFile = useCallback(
      (url: string) => {
        setUploadedFiles((prev) => {
          const newFiles = [...prev, url]
          onUploadedFilesChange?.(newFiles)
          return newFiles
        })
      },
      [onUploadedFilesChange]
    )

    // Remove file from uploaded files tracking
    const removeUploadedFile = useCallback(
      (url: string) => {
        setUploadedFiles((prev) => {
          const newFiles = prev.filter((file) => file !== url)
          onUploadedFilesChange?.(newFiles)
          return newFiles
        })
      },
      [onUploadedFilesChange]
    )

    // Cleanup uploaded files that are no longer in the content
    const _cleanupOrphanedFiles = useCallback(() => {
      if (!value) return

      const contentUrls: string[] = []

      // Extract all image and video URLs from the content
      const imgRegex = /<img[^>]+src="([^"]+)"/g
      const videoRegex = /<video[^>]+src="([^"]+)"/g

      let match
      while ((match = imgRegex.exec(value)) !== null) {
        contentUrls.push(match[1])
      }
      while ((match = videoRegex.exec(value)) !== null) {
        contentUrls.push(match[1])
      }

      // Find orphaned files (uploaded but not in content)
      const orphanedFiles = uploadedFiles.filter(
        (file) => !contentUrls.includes(file)
      )

      // Delete orphaned files from server
      orphanedFiles.forEach(async (fileUrl) => {
        try {
          const filename = extractFilenameFromUrl(fileUrl)
          if (filename) {
            await deleteFile(filename)
            removeUploadedFile(fileUrl)
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to delete orphaned file:', fileUrl, error)
        }
      })
    }, [value, uploadedFiles, extractFilenameFromUrl, removeUploadedFile])

    // Cleanup all uploaded files (call this when form is cancelled or closed without saving)
    const cleanupAllUploadedFiles = useCallback(async () => {
      if (uploadedFiles.length === 0) return

      const filesToDelete = [...uploadedFiles]

      for (const fileUrl of filesToDelete) {
        try {
          const filename = extractFilenameFromUrl(fileUrl)
          if (filename) {
            await deleteFile(filename)
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to delete file:', fileUrl, error)
        }
      }

      setUploadedFiles([])
      onUploadedFilesChange?.([])
    }, [uploadedFiles, extractFilenameFromUrl, onUploadedFilesChange])

    // Expose cleanup function to parent component through ref
    useImperativeHandle(
      ref,
      () => ({
        cleanupAllUploadedFiles,
      }),
      [cleanupAllUploadedFiles]
    )

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
    const uploadFile = useCallback(
      async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        try {
          const response = await useAuthAxios.postFormData<
            unknown,
            BaseResponseType,
            FormData
          >('/files', formData)
          const fileUrl = get(response, ['data', 'data', 'url'], '')

          // Track uploaded file
          if (fileUrl) {
            addUploadedFile(fileUrl)
          }

          return fileUrl
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('File upload failed:', error)
          throw error
        }
      },
      [addUploadedFile]
    )

    // Enhance existing videos in the editor
    const enhanceExistingVideos = useCallback(() => {
      const editorElement = quillRef.current
        ? (
            quillRef.current as { getEditor: () => { root: HTMLElement } }
          ).getEditor()
        : null
      if (editorElement?.root) {
        const videoElements = editorElement.root.querySelectorAll('video')
        videoElements.forEach((video) => {
          if (!video.classList.contains('enhanced')) {
            video.classList.add('enhanced')
            video.style.cssText = `
            max-width: 100% !important;
            width: 100% !important;
            height: auto !important;
            min-height: 400px !important;
            max-height: 600px !important;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin: 16px 0;
            background: #000;
            object-fit: cover;
            transition: all 0.3s ease;
          `

            // Add enhanced attributes
            video.controls = true
            video.preload = 'metadata'
            video.playsInline = true
            video.muted = false
            video.loop = false
            video.autoplay = false
          }
        })
      }
    }, [])

    // Insert media into editor
    const insertMedia = useCallback((url: string, type: 'image' | 'video') => {
      const editor = (
        quillRef.current! as {
          getEditor: () => {
            getSelection: () => { index: number } | null
            insertEmbed: (
              index: number,
              type: string,
              url: string,
              attributes?: Record<string, unknown>
            ) => void
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
        // Enhanced video attributes for better playback experience
        const videoAttributes = {
          controls: true,
          preload: 'metadata',
          playsinline: true,
          muted: false,
          loop: false,
          autoplay: false,
          width: '100%',
          height: 'auto',
          style:
            'min-height: 400px; max-height: 600px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);',
        }

        // Use enhanced video insertion for better experience
        editor.insertEmbed(range.index, 'video', url, videoAttributes)
        editor.insertText(range.index + 1, '', { alt: '' })

        // Apply enhanced styling after insertion
        setTimeout(() => {
          const editorElement = quillRef.current
            ? (
                quillRef.current as { getEditor: () => { root: HTMLElement } }
              ).getEditor()
            : null
          if (editorElement?.root) {
            const videoElement = editorElement.root.querySelector(
              `video[src="${url}"]`
            ) as HTMLVideoElement
            if (videoElement) {
              videoElement.style.cssText = `
              max-width: 100% !important;
              width: 100% !important;
              height: auto !important;
              min-height: 400px !important;
              max-height: 600px !important;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              margin: 16px 0;
              background: #000;
              object-fit: cover;
            `
            }
          }
        }, 100)
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
            ['clean'],
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
        'color',
        'background',
        'script',
        'font',
        'align',
        'link',
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

    // Enhance existing videos when the editor is ready
    useEffect(() => {
      enhanceExistingVideos()
    }, [enhanceExistingVideos])

    // Set up mutation observer to enhance videos as they're added and track content changes
    useEffect(() => {
      if (quillRef.current && isLayoutReady) {
        const editorElement = (
          quillRef.current as { getEditor: () => { root: HTMLElement } }
        ).getEditor()

        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as Element
                  if (element.tagName === 'VIDEO') {
                    setTimeout(() => enhanceExistingVideos(), 100)
                  } else if (element.querySelectorAll) {
                    const videos = element.querySelectorAll('video')
                    if (videos.length > 0) {
                      setTimeout(() => enhanceExistingVideos(), 100)
                    }
                  }
                }
              })

              // Check for removed nodes to track orphaned files
              mutation.removedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as Element
                  if (
                    element.tagName === 'IMG' ||
                    element.tagName === 'VIDEO'
                  ) {
                    const src = element.getAttribute('src')
                    if (src && uploadedFiles.includes(src)) {
                      // File was removed from content, mark for cleanup
                      setTimeout(() => _cleanupOrphanedFiles(), 100)
                    }
                  }
                }
              })
            }
          })
        })

        observer.observe(editorElement.root, {
          childList: true,
          subtree: true,
        })

        return () => observer.disconnect()
      }
    }, [
      isLayoutReady,
      enhanceExistingVideos,
      uploadedFiles,
      _cleanupOrphanedFiles,
    ])

    // Cleanup uploaded files when component unmounts if not saved
    useEffect(() => {
      return () => {
        // Only cleanup if there are uploaded files and the content is empty or minimal
        if (uploadedFiles.length > 0 && (!value || value.length < 50)) {
          cleanupAllUploadedFiles()
        }
      }
    }, [uploadedFiles, value, cleanupAllUploadedFiles])

    return <div className={cn('', className)}>{memoizedReactQuill}</div>
  }
)

export default QuillEditor
