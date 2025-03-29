import { createLazyFileRoute } from '@tanstack/react-router'
import ProductComponent from '@/features/(admin)/products'

export const Route = createLazyFileRoute('/_authenticated/admin/products/')({
  component: ProductComponent,
})
