'use client';

import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from '@/components/ui/file-upload';
import { Paperclip } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DropzoneOptions } from 'react-dropzone';

const FileSvgDraw = () => {
  const t = useTranslations('CommonMessages');
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">{t('clickToUpload')}</span>
        &nbsp; {t('orDragAndDrop')}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">JPEG, PNG, JPG</p>
    </>
  );
};

type FileUploadProps = {
  files: File[] | null;
  onValueChange?: (value: File[] | null) => void;
  dropZoneConfigs?: DropzoneOptions;
};

const FileUpload = ({
  files,
  onValueChange,
  dropZoneConfigs,
}: FileUploadProps) => {
  const dropZoneConfig = {
    maxFiles: dropZoneConfigs?.maxFiles ?? 1,
    maxSize: dropZoneConfigs?.maxSize ?? 1024 * 1024, // default 1MB
    multiple: dropZoneConfigs?.multiple ?? false,
  };

  return (
    <FileUploader
      value={files}
      onValueChange={onValueChange}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background rounded-lg p-2"
    >
      <FileInput className="outline-dashed outline-1">
        <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={file.lastModified} index={i}>
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FileUpload;
