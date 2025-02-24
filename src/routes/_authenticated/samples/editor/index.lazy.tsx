import { createLazyFileRoute } from '@tanstack/react-router'
import SampleEditor from '@/features/samples/editor'

export const Route = createLazyFileRoute('/_authenticated/samples/editor/')({
  component: SampleEditor,
})
