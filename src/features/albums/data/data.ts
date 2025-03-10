import { AlbumsStatusType } from '@/features/albums/data/schema.ts'

export const albumsCallTypes = new Map<AlbumsStatusType, string>([
  [true, 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  [false, 'bg-neutral-300/40 border-neutral-300'],
])
