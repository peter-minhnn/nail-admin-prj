import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useLangStore } from '@/stores/langStore.ts'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

// import {login} from "@/services/auth.service.ts";

export default function Dashboard() {
  const { setLangKey } = useLangStore()
  const intl = useIntl()

  useEffect(() => setLangKey('dashboard'), [])

  useEffect(() => {
    // login({userName: 'admin', password: 'Genie@1234!'}).finally();
  }, [])

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
        </div>
      </Main>
    </>
  )
}
