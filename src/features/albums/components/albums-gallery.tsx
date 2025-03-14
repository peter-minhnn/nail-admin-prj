import {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { FileType } from '@/types'
import { DialogType } from '@/types/base.type.ts'
import { FormattedMessage } from 'react-intl'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '@/components/ui'

type AlbumsGalleryDialogsProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<DialogType>>
  title: string
  description?: string
  images: FileType[]
}

export const AlbumsGalleryDialog: FC<AlbumsGalleryDialogsProps> = (props) => {
  const [imageGroups, setImageGroups] = useState<FileType[]>([])

  const memoizedImageGroups: ReactElement[] | null = useMemo(() => {
    if (!imageGroups.length) return null

    return imageGroups.map((image: FileType) => (
      <div key={image.id}>
        <img
          className='h-auto max-w-full rounded-lg'
          src={image.url}
          alt={image.originalName}
        />
      </div>
    ))
  }, [imageGroups])

  useEffect(() => {
    setImageGroups(props.images)
  }, [props.images])

  return (
    <Dialog
      open={props.open}
      onOpenChange={() => {
        props.setOpen('')
      }}
    >
      <DialogContent className='w-full max-w-full'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            <FormattedMessage id={props.title} />
          </DialogTitle>
          <DialogDescription>
            {props.description && <FormattedMessage id={props.description} />}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[40rem] w-full py-2'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
            {memoizedImageGroups}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
