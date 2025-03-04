import { IconRefresh, IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui'

export function BannersButtons() {
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
      >
        <span>Refresh</span> <IconRefresh size={18} />
      </Button>
      <Button className='space-x-1'>
        <span>Add new</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
