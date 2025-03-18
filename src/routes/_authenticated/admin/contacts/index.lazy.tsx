import { createLazyFileRoute } from '@tanstack/react-router'
import ContactsComponent from '@/features/(admin)/contacts'

export const Route = createLazyFileRoute('/_authenticated/admin/contacts/')({
  component: ContactsComponent,
})
