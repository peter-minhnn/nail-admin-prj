import { FC } from 'react'
import { IconPlus, IconRefresh } from '@tabler/icons-react'
import { FormattedMessage } from 'react-intl'
import { Button } from '@/components/(admin)/ui'

type PostsButtonsProps = {
  onRefresh: () => void
  onAdd: () => void
}

export const PostsButtons: FC<PostsButtonsProps> = (props) => {
  return (
    <div className='flex gap-2'>
      <Button
        className='space-x-1'
        variant='add'
        type='button'
        onClick={props.onAdd}
      >
        <span>
          <FormattedMessage id='common.addBtn' />
        </span>
        <IconPlus size={18} />
      </Button>
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
