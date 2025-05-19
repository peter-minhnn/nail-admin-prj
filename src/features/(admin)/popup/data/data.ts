import {
  PopupPublishType,
  PopupStatusType,
} from '@/features/(admin)/popup/data/schema.ts'

export const PopupCallPublishTypes = new Map<PopupPublishType, string>([
  [true, 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  [false, 'bg-neutral-300/40 border-neutral-300'],
])

export const PopupCallTypes = new Map<PopupStatusType, string>([
  ['image', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['content', 'bg-yellow-300/40 border-yellow-300'],
])

export const PopupTypeOptions = [
  {
    value: 'image',
    label: 'popup.image',
  },
  {
    value: 'content',
    label: 'popup.content',
  },
]

export const PopupPublishOptions = [
  {
    value: 'published',
    label: 'popup.isPublished',
  },
  {
    value: 'unpublished',
    label: 'popup.isNotPublished',
  },
]
