import { Dispatch, FC, SetStateAction } from 'react'
import { IconCancel } from '@tabler/icons-react'
import { DialogType } from '@/types'
import { FormattedMessage } from 'react-intl'
import QuillEditor from '@/components/quill-editor.tsx'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '@/components/ui'

type PostsPreviewDialogProps = {
  title: string
  description?: string
  setOpen: Dispatch<SetStateAction<DialogType>>
  open: boolean
  value: string | undefined
}

export const PostsPreviewDialog: FC<PostsPreviewDialogProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onOpenChange={() => {
        props.setOpen('')
      }}
    >
      <DialogContent className='max-w-7xl'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            <FormattedMessage id={props.title} />
          </DialogTitle>
          <DialogDescription>
            {props.description && <FormattedMessage id={props.description} />}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[35.25rem] w-full py-1 pr-4'>
          <QuillEditor value={props.value ?? ''} readOnly hideToolbar />
        </ScrollArea>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => props.setOpen('')}
          >
            <IconCancel size={18} />
            <FormattedMessage id='common.btnCancel' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
