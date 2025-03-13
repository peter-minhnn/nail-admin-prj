import { PostsDataType } from '@/features/posts/data/schema.ts'

export type PostsType = {
  id?: number
  titleEn: string
  titleVi: string
  contentEn: string
  contentVi: string
  thumbnail?: File | null
  isPublish: boolean
  postType: PostType
  sortOrder?: number
}

export type PostsFilterParams = {
  postType?: PostType
  content?: string
  page: number
  take: number
  order?: 'ASC' | 'DESC'
}

export type PostType = 'news' | 'activity' | 'service'

export type SortDataType = {
  isDragEnd: boolean
  newRows: PostsDataType[]
}
