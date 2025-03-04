import { Main } from '@/components/layout/main.tsx'
import { BannersButtons } from '@/features/banners/components'

export default function Banners() {
  return <Main>
    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">User List</h2>
        <p className="text-muted-foreground">
          Manage your users and their roles here.
        </p>
      </div>
      <BannersButtons />
    </div>
    <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
    </div>
  </Main>
}