import {
  Dispatch,
  SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  HTMLAttributes,
} from 'react'
import { deleteFile, uploadFile } from '@/services/upload.service.ts'
import { FileType } from '@/types/file.type.ts'
import get from 'lodash/get'
import { Trash2 as RemoveIcon } from 'lucide-react'
import {
  useDropzone,
  DropzoneState,
  FileRejection,
  DropzoneOptions,
} from 'react-dropzone'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type DirectionOptions = 'rtl' | 'ltr' | undefined

type FileUploaderContextType = {
  dropzoneState: DropzoneState
  isLOF: boolean
  isFileTooBig: boolean
  removeFileFromSet: (index: number) => void
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  orientation: 'horizontal' | 'vertical'
  direction: DirectionOptions
  files: File[] | null
  reset?: () => void
  filesUploaded?: FileType[]
}

const FileUploaderContext = createContext<FileUploaderContextType | null>(null)

export const useFileUpload = () => {
  const context = useContext(FileUploaderContext)
  if (!context) {
    throw new Error('useFileUpload must be used within a FileUploaderProvider')
  }
  return context
}

type FileUploaderProps = {
  value: File[] | null
  reSelect?: boolean
  onValueChange?: (value: File[] | null) => void
  dropzoneOptions: DropzoneOptions
  orientation?: 'horizontal' | 'vertical'
  resultFiles?: (files: FileType[]) => void
  useUpload?: boolean
}

/**
 * File upload Docs: {@link: https://localhost:3000/docs/file-upload}
 */

export const FileUploader = forwardRef<
  HTMLDivElement,
  FileUploaderProps & HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      dropzoneOptions,
      value,
      onValueChange,
      reSelect,
      orientation = 'vertical',
      children,
      dir,
      resultFiles,
      useUpload,
      ...props
    },
    ref
  ) => {
    const [isFileTooBig, setIsFileTooBig] = useState(false)
    const [isLOF, setIsLOF] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const [files, setFiles] = useState<File[] | null>([])
    const [filesUploaded, setFilesUploaded] = useState<FileType[]>([])
    const {
      accept = {
        'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      },
      maxFiles = 1,
      maxSize = 4 * 1024 * 1024,
      multiple = true,
    } = dropzoneOptions

    const reSelectAll = maxFiles === 1 ? true : reSelect
    const direction: DirectionOptions = dir === 'rtl' ? 'rtl' : 'ltr'

    const deleteFileServer = async (file: File[]) => {
      if (!file.length) return
      const response = await deleteFile(file[0].name)
      const isSuccess = get(response, ['result', 'success'], false)
      if (isSuccess) {
        if (!multiple) setFilesUploaded([])
      }
    }

    const removeFileFromSet = useCallback(
      (i: number) => {
        if (!value) return
        const newFiles = value.filter((_, index) => index !== i)
        deleteFileServer(value.filter((_, index) => index === i)).finally()
        setFiles(newFiles)
        onValueChange?.(newFiles)
      },
      [value, onValueChange]
    )

    const handleKeyDown = useCallback(
      (e: any) => {
        e.preventDefault()
        e.stopPropagation()

        if (!value) return

        const moveNext = () => {
          const nextIndex = activeIndex + 1
          setActiveIndex(nextIndex > value.length - 1 ? 0 : nextIndex)
        }

        const movePrev = () => {
          const nextIndex = activeIndex - 1
          setActiveIndex(nextIndex < 0 ? value.length - 1 : nextIndex)
        }

        const prevKey =
          orientation === 'horizontal'
            ? direction === 'ltr'
              ? 'ArrowLeft'
              : 'ArrowRight'
            : 'ArrowUp'

        const nextKey =
          orientation === 'horizontal'
            ? direction === 'ltr'
              ? 'ArrowRight'
              : 'ArrowLeft'
            : 'ArrowDown'

        if (e.key === nextKey) {
          moveNext()
        } else if (e.key === prevKey) {
          movePrev()
        } else if (e.key === 'Enter' || e.key === 'Space') {
          if (activeIndex === -1) {
            dropzoneState.inputRef.current?.click()
          }
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
          if (activeIndex !== -1) {
            removeFileFromSet(activeIndex)
            if (value.length - 1 === 0) {
              setActiveIndex(-1)
              return
            }
            movePrev()
          }
        } else if (e.key === 'Escape') {
          setActiveIndex(-1)
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [value, activeIndex, removeFileFromSet]
    )

    const onDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const files = acceptedFiles

        if (!files) {
          toast.error('file error , probably too big')
          return
        }

        const newValues: File[] = value ? [...value] : []

        if (reSelectAll) {
          newValues.splice(0, newValues.length)
        }

        files.forEach((file) => {
          if (newValues.length < maxFiles) {
            newValues.push(file)
          }
        })

        onValueChange?.(newValues)
        setFiles(newValues)

        if (rejectedFiles.length > 0) {
          for (const element of rejectedFiles) {
            if (element.errors[0]?.code === 'file-too-large') {
              toast.error(
                `File is too large. Max size is ${maxSize / 1024 / 1024}MB`
              )
              break
            }
            if (element.errors[0]?.message) {
              toast.error(element.errors[0].message)
              break
            }
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [reSelectAll, value]
    )

    const handleUploadFiles = useCallback(async () => {
      if (!files) return
      if (files.length === 0) return
      if (!multiple) {
        const response = await uploadFile(files[0])
        const isSuccess = get(response, ['result', 'success'], false)
        if (isSuccess) {
          setFilesUploaded([get(response, ['result', 'data'], [])])
        }
      }
    }, [files, multiple])

    useEffect(() => {
      if (!value) return
      if (value.length === maxFiles) {
        setIsLOF(true)
        return
      }
      setIsLOF(false)
    }, [value, maxFiles])

    useEffect(() => {
      useUpload && handleUploadFiles().finally()
    }, [files, useUpload])

    useEffect(() => {
      if (!filesUploaded?.length) return
      resultFiles?.(filesUploaded)
    }, [filesUploaded])

    const opts = dropzoneOptions || { accept, maxFiles, maxSize, multiple }

    const dropzoneState = useDropzone({
      ...opts,
      onDrop,
      onDropRejected: () => {
        setIsFileTooBig(true)
        setFiles([])
        onValueChange?.([])
        files?.length &&
          toast.error(
            `File is too large. Max size is ${formatFileSize(maxSize)}`
          )
      },
      onDropAccepted: () => setIsFileTooBig(false),
    })

    const reset = useCallback(() => {
      setFiles([])
    }, [])

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const objContext = useMemo(() => {
      return {
        dropzoneState,
        isLOF,
        isFileTooBig,
        removeFileFromSet,
        activeIndex,
        setActiveIndex,
        orientation,
        direction,
        reset,
        files,
        filesUploaded,
      }
    }, [
      dropzoneState,
      isLOF,
      isFileTooBig,
      removeFileFromSet,
      activeIndex,
      setActiveIndex,
      orientation,
      direction,
      reset,
      files,
      filesUploaded,
    ])

    return (
      <FileUploaderContext.Provider value={objContext}>
        <div
          ref={ref}
          // tabIndex={0}
          onKeyDownCapture={handleKeyDown}
          className={cn(
            'grid w-full overflow-hidden focus:outline-none',
            className,
            {
              'gap-2': value && value.length > 0,
            }
          )}
          dir={dir}
          {...props}
        >
          {children}
        </div>
      </FileUploaderContext.Provider>
    )
  }
)

FileUploader.displayName = 'FileUploader'

export const FileUploaderContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { orientation } = useFileUpload()
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className={cn('w-full px-1')} ref={containerRef}>
      <div
        {...props}
        ref={ref}
        className={cn(
          'flex gap-1 rounded-xl',
          orientation === 'horizontal' ? 'flex-raw flex-wrap' : 'flex-col',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
})

FileUploaderContent.displayName = 'FileUploaderContent'

export const FileUploaderItem = forwardRef<
  HTMLDivElement,
  { index: number } & HTMLAttributes<HTMLDivElement>
>(({ className, index, children, ...props }, ref) => {
  const { removeFileFromSet, activeIndex, direction } = useFileUpload()
  const isSelected = index === activeIndex
  return (
    <div
      ref={ref}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'relative h-6 cursor-pointer justify-between p-1',
        className,
        isSelected ? 'bg-muted' : ''
      )}
      {...props}
    >
      <div className='flex h-full w-full items-center gap-1.5 font-medium leading-none tracking-tight'>
        {children}
      </div>
      <button
        type='button'
        className={cn(
          'absolute',
          direction === 'rtl' ? 'left-1 top-1' : 'right-1 top-1'
        )}
        onClick={() => removeFileFromSet(index)}
      >
        <span className='sr-only'>remove item {index}</span>
        <RemoveIcon className='h-4 w-4 duration-200 ease-in-out hover:stroke-destructive' />
      </button>
    </div>
  )
})

FileUploaderItem.displayName = 'FileUploaderItem'

export const FileInput = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { dropzoneState, isFileTooBig, isLOF } = useFileUpload()
  const rootProps = isLOF ? {} : dropzoneState.getRootProps()
  return (
    <div
      ref={ref}
      {...props}
      className={`relative w-full ${
        isLOF ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
    >
      <div
        className={cn(
          `w-full rounded-lg duration-300 ease-in-out ${
            dropzoneState.isDragAccept
              ? 'border-green-500'
              : dropzoneState.isDragReject || isFileTooBig
                ? 'border-red-500'
                : 'border-gray-300'
          }`,
          className
        )}
        {...rootProps}
      >
        {children}
      </div>
      <Input
        multiple={false}
        ref={dropzoneState.inputRef}
        disabled={isLOF}
        {...dropzoneState.getInputProps()}
        className={`${isLOF ? 'cursor-not-allowed' : ''}`}
      />
    </div>
  )
})

FileInput.displayName = 'FileInput'
