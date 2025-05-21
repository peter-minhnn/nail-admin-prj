import { createFileRoute, Outlet } from '@tanstack/react-router'
import ContactButtonGroup from '@/features/(guest)/contact/components/contact-button-group.tsx'

export const Route = createFileRoute('/_guest')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='bg-[#F2F1ED]'>
      <Outlet />
      <ContactButtonGroup />
    </main>
  )
}
