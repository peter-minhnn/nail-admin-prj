import { MouseEvent } from 'react'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

type EditorPrimaryButtonsProps = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const EditorPrimaryButtons = (
  props: Readonly<EditorPrimaryButtonsProps>
) => {
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={props.onClick}>
        <span>Save</span> <IconDeviceFloppy size={18} />
      </Button>
    </div>
  )
}
