import { BannersSlideType } from '@/features/(admin)/banners/data/schema.ts'

export const BannersTypes = [
  {
    value: 0,
    label: 'banners.home',
  },
  {
    value: 1,
    label: 'banners.about',
  },
  {
    value: 2,
    label: 'banners.services',
  },
  {
    value: 3,
    label: 'banners.training',
  },
  {
    value: 4,
    label: 'banners.products',
  },
  {
    value: 5,
    label: 'banners.activities',
  },
  {
    value: 6,
    label: 'banners.contact',
  },
]

export const bannersCallTypes = new Map<BannersSlideType, string>([
  [0, 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  [1, 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [2, 'bg-cyan-200/40 text-cyan-900 dark:text-cyan-100 border-cyan-300'],
  [3, 'bg-pink-200/40 text-pink-900 dark:text-pink-100 border-pink-300'],
  [
    4,
    'bg-indigo-200/40 text-indigo-900 dark:text-indigo-100 border-indigo-300',
  ],
  [5, 'bg-amber-200/40 text-amber-900 dark:text-amber-100 border-amber-300'],
  [
    6,
    'bg-fuchsia-200/40 text-fuchsia-900 dark:text-fuchsia-100 border-fuchsia-300',
  ],
])
