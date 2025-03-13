import { createLazyFileRoute } from '@tanstack/react-router'
import ContactsComponent from '@/features/contacts'

export const Route = createLazyFileRoute('/_authenticated/contacts/')({
  component: ContactsComponent,
})
