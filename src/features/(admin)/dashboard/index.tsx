import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'
import { useLangStore } from '@/stores/lang-store.ts'
import { Header } from '@/components/(admin)/layout/header.tsx'
import { Main } from '@/components/(admin)/layout/main.tsx'
import { ProfileDropdown } from '@/components/(admin)/profile-dropdown.tsx'
import { Search } from '@/components/(admin)/search.tsx'
import { ThemeSwitch } from '@/components/(admin)/theme-switch.tsx'
import { Button } from '@/components/(admin)/ui/button.tsx'

export default function Dashboard() {
  const { setLangKey } = useLangStore()
  const intl = useIntl()

  useEffect(() => setLangKey('dashboard'), [])

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {intl.formatMessage({ id: 'title' })}
          </h1>
          <Button
            variant='secondary'
            size='sm'
            onClick={() => toast.error('Error')}
          >
            Click Me
          </Button>
        </div>
      </Main>
    </>
  )
}
