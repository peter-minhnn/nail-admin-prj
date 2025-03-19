import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='bg-[#F2F1ED]'>
      <Outlet />
    </main>
  )
}
