import AdminPageContainer from '@/components/(admin)/layout/admin-page-container.tsx'
import { Main } from '@/components/(admin)/layout/main.tsx'

export default function Dashboard() {
  return (
    <AdminPageContainer title='Dashboard'>
      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-center space-y-2 h-[calc(100vh_-_18vh)]'>
          <h1 className='text-lg sm:text-6xl font-bold tracking-tight text-accent-foreground h-full flex items-center'>
            DÉJÀ VU
          </h1>
        </div>
      </Main>
    </AdminPageContainer>
  )
}
