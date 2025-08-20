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

const mediaHandlerClipboard = (_: unknown, delta: unknown) => {
  return delta
}

// File size limits (in MB)
const FILE_SIZE_LIMITS = {
  IMAGE: 5, // 5MB for images
  VIDEO: 150, // 150MB for videos
} as const

// Video dimension constants
const VIDEO_DIMENSIONS = {
  MAX_WIDTH: 1200, // Maximum width for editor (increased for better quality)
  MAX_HEIGHT: 800, // Maximum height for editor (increased for better quality)
  MIN_HEIGHT: 300, // Minimum height for better visibility
} as const

const calculateVideoDimensions = (videoWidth: number, videoHeight: number) => {
  let finalWidth = videoWidth
  let finalHeight = videoHeight

  if (
    videoWidth > VIDEO_DIMENSIONS.MAX_WIDTH ||
    videoHeight > VIDEO_DIMENSIONS.MAX_HEIGHT
  ) {
    const aspectRatio = videoWidth / videoHeight
    if (videoWidth > videoHeight) {
      finalWidth = VIDEO_DIMENSIONS.MAX_WIDTH
      finalHeight = VIDEO_DIMENSIONS.MAX_WIDTH / aspectRatio
    } else {
      finalHeight = VIDEO_DIMENSIONS.MAX_HEIGHT
      finalWidth = VIDEO_DIMENSIONS.MAX_HEIGHT * aspectRatio
    }
  }

  if (finalHeight < VIDEO_DIMENSIONS.MIN_HEIGHT) {
    const aspectRatio = finalWidth / finalHeight
    finalHeight = VIDEO_DIMENSIONS.MIN_HEIGHT
    finalWidth = VIDEO_DIMENSIONS.MIN_HEIGHT * aspectRatio
  }

  return { width: finalWidth, height: finalHeight }
}

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
    const isMountedRef = useRef(false)
    const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false)
    const [uploadState, setUploadState] = useState<UploadState>({
      isUploading: false,
      uploadType: null,
    })
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

    const extractFilenameFromUrl = useCallback((url: string): string => {
      try {
        const urlObj = new URL(url)
        const pathname = urlObj.pathname
        const filename = pathname.split('/').pop()
        return filename || ''
      } catch {
        const parts = url.split('/')
        return parts[parts.length - 1] || ''
      }
    }, [])

    const addUploadedFile = useCallback(
      (url: string) => {
        if (!isMountedRef.current) return
        setUploadedFiles((prev) => {
          const newFiles = [...prev, url]
          onUploadedFilesChange?.(newFiles)
          return newFiles
        })
      },
      [onUploadedFilesChange]
    )

    const removeUploadedFile = useCallback(
      (url: string) => {
        if (!isMountedRef.current) return
        setUploadedFiles((prev) => {
          const newFiles = prev.filter((file) => file !== url)
          onUploadedFilesChange?.(newFiles)
          return newFiles
        })
      },
      [onUploadedFilesChange]
    )

    const cleanupOrphanedFiles = useCallback(() => {
      if (!value) return

      const contentUrls: string[] = []

      const imgRegex = /<img[^>]+src="([^"]+)"/g
      const videoRegex = /<video[^>]+src="([^"]+)"/g

      let match
      while ((match = imgRegex.exec(value)) !== null) {
        contentUrls.push(match[1])
      }
      while ((match = videoRegex.exec(value)) !== null) {
        contentUrls.push(match[1])
      }

      const orphanedFiles = uploadedFiles.filter(
        (file) => !contentUrls.includes(file)
      )

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

      if (isMountedRef.current) {
        setUploadedFiles([])
        onUploadedFilesChange?.([])
      }
    }, [uploadedFiles, extractFilenameFromUrl, onUploadedFilesChange])

    useImperativeHandle(
      ref,
      () => ({
        cleanupAllUploadedFiles,
      }),
      [cleanupAllUploadedFiles]
    )

    const validateFileSize = useCallback(
      (file: File, maxSizeMB: number = 150) => {
        const maxSize = maxSizeMB * 1024 * 1024
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

            const handleLoadedMetadata = () => {
              const videoWidth = video.videoWidth
              const videoHeight = video.videoHeight

              const { width: finalWidth, height: finalHeight } =
                calculateVideoDimensions(videoWidth, videoHeight)

              video.style.cssText = `
                width: ${finalWidth}px !important;
                height: ${finalHeight}px !important;
                max-width: 100% !important;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                margin: 16px 0;
                background: #000;
                object-fit: contain;
                transition: all 0.3s ease;
              `

              video.removeEventListener('loadedmetadata', handleLoadedMetadata)
            }

            video.addEventListener('loadedmetadata', handleLoadedMetadata)

            video.addEventListener('error', () => {
              video.setAttribute('data-error', 'true')
              video.style.cssText = `
                max-width: 100% !important;
                width: 100% !important;
                height: auto !important;
                min-height: ${VIDEO_DIMENSIONS.MIN_HEIGHT}px !important;
                max-height: ${VIDEO_DIMENSIONS.MAX_HEIGHT}px !important;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                margin: 16px 0;
                background: #fee;
                border: 2px solid #f56565;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #c53030;
                font-weight: 500;
                object-fit: cover;
                transition: all 0.3s ease;
              `
            })

            video.style.cssText = `
              max-width: 100% !important;
              width: 100% !important;
              height: auto !important;
              min-height: ${VIDEO_DIMENSIONS.MIN_HEIGHT}px !important;
              max-height: ${VIDEO_DIMENSIONS.MAX_HEIGHT}px !important;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              margin: 16px 0;
              background: #000;
              object-fit: cover;
              transition: all 0.3s ease;
            `

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
            'min-height: 300px; max-height: 600px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);',
        }

        editor.insertEmbed(range.index, 'video', url, videoAttributes)
        editor.insertText(range.index + 1, '', { alt: '' })

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
              const handleLoadedMetadata = () => {
                const videoWidth = videoElement.videoWidth
                const videoHeight = videoElement.videoHeight

                const { width: finalWidth, height: finalHeight } =
                  calculateVideoDimensions(videoWidth, videoHeight)

                videoElement.style.cssText = `
                  width: ${finalWidth}px !important;
                  height: ${finalHeight}px !important;
                  max-width: 100% !important;
                  border-radius: 8px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  margin: 16px 0;
                  background: #000;
                  object-fit: contain;
                  transition: all 0.3s ease;
                `

                videoElement.removeEventListener(
                  'loadedmetadata',
                  handleLoadedMetadata
                )
              }

              videoElement.addEventListener(
                'loadedmetadata',
                handleLoadedMetadata
              )

              videoElement.addEventListener('error', () => {
                videoElement.setAttribute('data-error', 'true')
                videoElement.style.cssText = `
                  max-width: 100% !important;
                  width: 100% !important;
                  height: auto !important;
                  min-height: ${VIDEO_DIMENSIONS.MIN_HEIGHT}px !important;
                  max-height: ${VIDEO_DIMENSIONS.MAX_HEIGHT}px !important;
                  border-radius: 8px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  margin: 16px 0;
                  background: #fee;
                  border: 2px solid #f56565;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #c53030;
                  font-weight: 500;
                  object-fit: cover;
                  transition: all 0.3s ease;
                `
              })

              videoElement.style.cssText = `
                max-width: 100% !important;
                width: 100% !important;
                height: auto !important;
                min-height: ${VIDEO_DIMENSIONS.MIN_HEIGHT}px !important;
                max-height: ${VIDEO_DIMENSIONS.MAX_HEIGHT}px !important;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                margin: 16px 0;
                background: #000;
                object-fit: cover;
                transition: all 0.3s ease;
              `
            }
          }
        }, 100)
      }
    }, [])

    const handlePaste = useCallback(
      async (e: ClipboardEvent) => {
        const clipboardData = e.clipboardData
        const items = clipboardData?.items

        if (!items) return

        for (const element of items) {
          if (uploadState.isUploading) break

          if (element.type.indexOf('image') !== -1) {
            e.preventDefault()
            const file = element.getAsFile()
            if (file) {
              try {
                validateFileSize(file, FILE_SIZE_LIMITS.IMAGE)

                if (isMountedRef.current) {
                  setUploadState({ isUploading: true, uploadType: 'image' })
                }
                const fileUrl = await uploadFile(file)
                insertMedia(fileUrl, 'image')
              } catch (error) {
                if (error instanceof Error) {
                  alert(error.message)
                } else {
                  alert('Failed to upload pasted image')
                }
              } finally {
                if (isMountedRef.current) {
                  setUploadState({ isUploading: false, uploadType: null })
                }
              }
            }
            break
          }
        }
      },
      [uploadState.isUploading, uploadFile, insertMedia, validateFileSize]
    )

    const imageHandler = useCallback(() => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files?.[0]
        if (file) {
          try {
            validateFileSize(file, FILE_SIZE_LIMITS.IMAGE)

            if (isMountedRef.current) {
              setUploadState({ isUploading: true, uploadType: 'image' })
            }
            const fileUrl = await uploadFile(file)
            insertMedia(fileUrl, 'image')
          } catch (error) {
            if (error instanceof Error) {
              alert(error.message)
            } else {
              alert('Failed to upload image')
            }
          } finally {
            if (isMountedRef.current) {
              setUploadState({ isUploading: false, uploadType: null })
            }
          }
        }
      }
    }, [uploadFile, insertMedia, validateFileSize])

    const videoHandler = useCallback(() => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'video/*')
      input.click()

      input.onchange = async () => {
        const file = input.files?.[0]
        if (file) {
          try {
            validateFileSize(file, FILE_SIZE_LIMITS.VIDEO)

            if (isMountedRef.current) {
              setUploadState({ isUploading: true, uploadType: 'video' })
            }
            const fileUrl = await uploadFile(file)
            insertMedia(fileUrl, 'video')
          } catch (error) {
            if (error instanceof Error) {
              alert(error.message)
            } else {
              alert('Failed to upload video')
            }
          } finally {
            if (isMountedRef.current) {
              setUploadState({ isUploading: false, uploadType: null })
            }
          }
        }
      }
    }, [uploadFile, insertMedia, validateFileSize])

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
            matchers: [['img', mediaHandlerClipboard]],
          },
        },
      }
    }, [isLayoutReady, hideToolbar, imageHandler, videoHandler])

    const handleChange = useCallback(
      (html: string) => {
        setValue?.(html)
        onChange?.(html)
      },
      [setValue, onChange]
    )

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
      isMountedRef.current = true
      setIsLayoutReady(true)

      return () => {
        isMountedRef.current = false
        setIsLayoutReady(false)
      }
    }, [])

    useEffect(() => {
      if (quillRef.current && isLayoutReady) {
        const editor = (
          quillRef.current as { getEditor: () => { root: HTMLElement } }
        )?.getEditor()
        editor.root.addEventListener('paste', handlePaste)

        return () => {
          editor.root.removeEventListener('paste', handlePaste)
        }
      }
    }, [handlePaste, isLayoutReady])

    useEffect(() => {
      if (isLayoutReady) {
        requestAnimationFrame(() => {
          if (isMountedRef.current) {
            enhanceExistingVideos()
          }
        })
      }
    }, [enhanceExistingVideos, isLayoutReady])

    useEffect(() => {
      if (quillRef.current && isLayoutReady) {
        const editorElement = (
          quillRef.current as { getEditor: () => { root: HTMLElement } }
        ).getEditor()

        const observer = new MutationObserver((mutations) => {
          if (!isLayoutReady || !isMountedRef.current) return

          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as Element
                  if (element.tagName === 'VIDEO') {
                    requestAnimationFrame(() => {
                      if (isMountedRef.current) {
                        enhanceExistingVideos()
                      }
                    })
                  } else if (element.querySelectorAll) {
                    const videos = element.querySelectorAll('video')
                    if (videos.length > 0) {
                      requestAnimationFrame(() => {
                        if (isMountedRef.current) {
                          enhanceExistingVideos()
                        }
                      })
                    }
                  }
                }
              })

              mutation.removedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as Element
                  if (
                    element.tagName === 'IMG' ||
                    element.tagName === 'VIDEO'
                  ) {
                    const src = element.getAttribute('src')
                    if (src && uploadedFiles.includes(src)) {
                      requestAnimationFrame(() => {
                        if (isMountedRef.current) {
                          cleanupOrphanedFiles()
                        }
                      })
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
      cleanupOrphanedFiles,
    ])

    useEffect(() => {
      return () => {
        if (uploadedFiles.length > 0 && (!value || value.length < 50)) {
          if (isMountedRef.current) {
            cleanupAllUploadedFiles()
          }
        }
      }
    }, [uploadedFiles, value, cleanupAllUploadedFiles])

    return <div className={cn('', className)}>{memoizedReactQuill}</div>
  }
)

export default QuillEditor
