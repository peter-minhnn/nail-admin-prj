import { FC } from 'react'
import { IconFileExcel, IconRefresh } from '@tabler/icons-react'
import { FormattedMessage } from 'react-intl'
import { Button } from '@/components/(admin)/ui'

type PostsButtonsProps = {
  onRefresh: () => void
  onExport: () => void
  loading?: boolean
}

export const ContactButtons: FC<PostsButtonsProps> = (props) => {
  return (
    <div className='flex gap-2'>
      <Button
        className='space-x-1'
        variant='excel'
        type='button'
        onClick={props.onExport}
        loading={props.loading}
        disabled={props.loading}
      >
        <FormattedMessage id='common.exportExcelBtn' />
        <IconFileExcel size={18} />
      </Button>
      <Button
        variant='outline'
        className='space-x-1'
        type='button'
        onClick={props.onRefresh}
        loading={props.loading}
        disabled={props.loading}
      >
        <IconRefresh size={18} />
      </Button>
    </div>
  )
}
