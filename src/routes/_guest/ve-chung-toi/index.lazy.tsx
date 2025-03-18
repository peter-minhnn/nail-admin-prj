import { createLazyFileRoute } from '@tanstack/react-router'
import AboutUsComponent from '@/features/(guest)/about'

export const Route = createLazyFileRoute('/_guest/ve-chung-toi/')({
  component: AboutUsComponent,
})
