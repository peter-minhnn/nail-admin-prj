import { createLazyFileRoute } from '@tanstack/react-router'
import MaintenanceError from '@/features/(admin)/errors/maintenance-error'

export const Route = createLazyFileRoute('/admin/(errors)/503')({
  component: MaintenanceError,
})
