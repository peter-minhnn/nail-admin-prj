import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useLangStore } from '@/stores/lang-store.ts'
import AdminPageContainer from '@/components/(admin)/layout/admin-page-container.tsx'
import { Card } from '@/components/(admin)/ui'
import AuthLayout from '../auth-layout.tsx'
import { UserAuthForm } from './components/user-auth-form.tsx'

const BrTag = () => <br />

export default function SignIn() {
  const { setLangKey } = useLangStore()
  const intl = useIntl()

  useEffect(() => setLangKey('auth'), [])

  return (
    <AdminPageContainer title={intl.formatMessage({ id: 'signIn.title' })}>
      <AuthLayout>
        <Card className='p-6'>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              <FormattedMessage id='signIn.title' />
            </h1>
            <p className='text-sm text-muted-foreground'>
              <FormattedMessage
                id='signIn.description'
                values={{ br: () => <BrTag /> }}
              />
            </p>
          </div>
          <UserAuthForm />
        </Card>
      </AuthLayout>
    </AdminPageContainer>
  )
}
