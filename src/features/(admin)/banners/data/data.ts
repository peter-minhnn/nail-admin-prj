import { BannersSlideType } from '@/features/(admin)/banners/data/schema.ts'

export const BannersTypes = [
  {
    value: 0,
    label: 'banners.other',
  },
  {
    value: 1,
    label: 'banners.slide',
  },
]

export const bannersCallTypes = new Map<BannersSlideType, string>([
  [0, 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  [1, 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
])
