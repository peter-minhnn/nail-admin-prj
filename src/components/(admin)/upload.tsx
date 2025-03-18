import { FileType } from '@/types/file.type.ts'
import { Paperclip } from 'lucide-react'
import { DropzoneOptions } from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from '@/components/(admin)/ui/file-upload.tsx'

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className='mb-3 h-8 w-8 text-gray-500 dark:text-gray-400'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 20 16'
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
        />
      </svg>
      <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
        <span className='font-semibold'>
          <FormattedMessage id='common.clickToUpload' />
        </span>
        &nbsp;
        <FormattedMessage id='common.orDragAndDrop' />
      </p>
      <p className='text-xs text-gray-500 dark:text-gray-400'>
        JPEG, PNG, JPG, GIF
      </p>
    </>
  )
}

type FileUploadProps = {
  files: File[] | null
  onValueChange?: (value: File[] | null) => void
  dropZoneConfigs?: DropzoneOptions
  resultFiles?: (files: FileType[]) => void
  disabled?: boolean
}

const FileUpload = ({
  files,
  onValueChange,
  dropZoneConfigs,
  resultFiles,
  disabled,
}: FileUploadProps) => {
  const dropZoneConfig = {
    maxFiles: dropZoneConfigs?.maxFiles ?? 1,
    maxSize: dropZoneConfigs?.maxSize ?? 1024 * 1024, // default 1MB
    multiple: dropZoneConfigs?.multiple ?? false,
  }

  return (
    <FileUploader
      value={files}
      onValueChange={onValueChange}
      dropzoneOptions={dropZoneConfig}
      resultFiles={resultFiles}
      className='relative rounded-lg bg-background p-0.5'
    >
      <FileInput className='outline-dashed outline-1' disabled={disabled}>
        <div className='flex w-full flex-col items-center justify-center pb-4 pt-3'>
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={file.lastModified} index={i}>
              <Paperclip className='h-4 w-4 stroke-current' />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  )
}

export default FileUpload
