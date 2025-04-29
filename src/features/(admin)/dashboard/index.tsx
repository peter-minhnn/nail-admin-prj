import AdminPageContainer from '@/components/(admin)/layout/admin-page-container.tsx'
import { Main } from '@/components/(admin)/layout/main.tsx'

export default function Dashboard() {
  return (
    <AdminPageContainer title='Dashboard'>
      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex h-[calc(100vh_-_18vh)] items-center justify-center space-y-2'>
          <h1 className='flex h-full items-center text-lg font-bold tracking-tight text-accent-foreground sm:text-6xl'>
            DÉJÀ VU
          </h1>
        </div>
      </Main>
    </AdminPageContainer>
  )
}
