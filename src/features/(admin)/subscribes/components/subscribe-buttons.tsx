import { FC } from 'react'
import { IconRefresh } from '@tabler/icons-react'
import { Button } from '@/components/(admin)/ui'

type SubscribeButtonsProps = {
  onRefresh: () => void
}

export const SubscribeButtons: FC<SubscribeButtonsProps> = (props) => {
  return (
    <div className='flex'>
      <Button
        variant='outline'
        className='space-x-1'
        type='button'
        onClick={props.onRefresh}
      >
        <IconRefresh size={18} />
      </Button>
    </div>
  )
}
