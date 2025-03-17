import {
  PostsPublishType,
  PostsStatusType,
} from '@/features/posts/data/schema.ts'

export const postsCallPublishTypes = new Map<PostsPublishType, string>([
  [true, 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  [false, 'bg-neutral-300/40 border-neutral-300'],
])

export const postsCallTypes = new Map<PostsStatusType, string>([
  ['news', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['activity', 'bg-yellow-300/40 border-yellow-300'],
  ['service', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  ['training', 'bg-lime-200/40 text-lime-900 dark:text-lime-100 border-lime-300'],
  ['product', 'bg-cyan-200/40 text-cyan-900 dark:text-cyan-100 border-cyan-300'],
])

export const PostsStatusList = [
  {
    value: 'news',
    label: 'posts.news',
  },
  {
    value: 'activity',
    label: 'posts.activity',
  },
  {
    value: 'service',
    label: 'posts.service',
  },
  {
    value: 'training',
    label: 'posts.training',
  },
  {
    value: 'product',
    label: 'posts.product',
  },
]
